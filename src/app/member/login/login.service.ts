import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, observable } from 'rxjs';
import { BASE_URL, TEMP_PASS_ENDPOINT } from 'src/app/constants';
import { CoreService } from 'src/app/core/core.service';
import { AuthenticationResponse } from 'src/app/shared/authentication-response';


 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInSubject = new ReplaySubject<AuthenticationResponse>(1);

  loggedInStatusChange = this.loggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private coreService : CoreService) { }

loggedIn(auth : AuthenticationResponse){
    // Once the user is logged in, emit true to notify subscribers
  this.loggedInSubject.next(auth);
}

loggedOut(auth : any){
  this.coreService.resetAuthToken();
  this.loggedInSubject.next(auth);
}

createTempPassword(username: string): Observable<any> {
  return this.http.post(`${BASE_URL}/${TEMP_PASS_ENDPOINT}/${username}`,null,this.coreService.getHeader());
}

}
