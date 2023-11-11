import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, observable } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { AuthenticationResponse } from 'src/app/shared/authentication-response';


 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInSubject = new ReplaySubject<AuthenticationResponse>(1);

  loggedInStatusChange = this.loggedInSubject.asObservable();

  constructor(private coreService : CoreService) { }

loggedIn(auth : AuthenticationResponse){
    // Once the user is logged in, emit true to notify subscribers
  this.loggedInSubject.next(auth);
}

loggedOut(auth : any){
  this.coreService.resetAuthToken();
  this.loggedInSubject.next(auth);
}
}
