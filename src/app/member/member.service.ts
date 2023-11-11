import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from './member.model';
import { BASE_URL, MEMBER_ENDPOINT } from '../constants';
import { CoreService } from '../core/core.service';

var endpoint =BASE_URL+MEMBER_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient,
    private coreService : CoreService
    ) {}
  
  getByUsername(username: string): Observable<any> {
    return this.http.get(`${endpoint}/username=${username}`,this.coreService.getHeader());
  }
}
