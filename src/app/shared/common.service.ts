import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL, CLIENT_LOCATION_URL, MEMBER_ENDPOINT, MEMBER_LOGIN_ENDPOINT, MEMBER_LOGOUT_ENDPOINT } from '../constants';
import { Client } from './client.model';
import { AuthenticationResponse } from './authentication-response';
import { AuthenticationRequest } from '../member/login/authentication-request';
import { CoreService } from '../core/core.service';
import { Member } from '../member/member.model';
 


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  endpoint = BASE_URL;
  isEndpointSet=false;
  constructor(private http: HttpClient,
    private coreService: CoreService,) {}

  // All utility methods 
  getClientSystemData(): Observable<Client> {
    return this.http.get(CLIENT_LOCATION_URL).pipe(
      map((data: any) => {
        return new Client(data);
      })
    );
  }

  get(id: number, endpoint: string ): Observable<any> {
    return this.http.get(`${BASE_URL}/${endpoint}/${id}`,this.coreService.getHeader());
  }

  getByUsername(username: string): Observable<Member> {
    return this.http.get<Member>(`${BASE_URL}/${MEMBER_ENDPOINT}/user-name=${username}`,this.coreService.getHeader());
  }

  getAll( endpoint: string ): Observable<any> {
    return this.http.get(`${BASE_URL}/${endpoint}`,this.coreService.getHeader());
  }

  add(data: any,  endpoint: string ): Observable<any> {
    return this.http.post(`${BASE_URL}/${endpoint}`, data, this.coreService.getHeader());
  }

  login(data: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${BASE_URL}/${MEMBER_LOGIN_ENDPOINT}`, data, this.coreService.getHeader());
  }

  logout(){
    return this.http.get<AuthenticationResponse>(`${BASE_URL}/${MEMBER_LOGOUT_ENDPOINT}`, this.coreService.getHeader());
  }

  update(id: number, data: any,  endpoint: string ): Observable<any> {
    return this.http.put(`${BASE_URL}/${endpoint}/${id}`, data, this.coreService.getHeader());
  }

  delete(id: number,  endpoint: string ): Observable<any> {
    return this.http.delete(`${BASE_URL}/${endpoint}/${id}`,this.coreService.getHeader());
  }


}

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//   })
// };
