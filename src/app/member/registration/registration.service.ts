import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../member.model';
import { Observable, catchError ,ObservableInput} from 'rxjs';
import { BASE_URL } from '../../constants';


@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  constructor(private http: HttpClient) { }
  private memberApiUrl = BASE_URL + '/member';

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.memberApiUrl, member, httpOptions)
      .pipe(
        catchError(this.handleError('addMember', member))
      );
  }
  handleError(method: string, member: Member): (err: any, caught: Observable<Member>) => ObservableInput<any> {
    throw new Error('Failed to save new member registration.');
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
