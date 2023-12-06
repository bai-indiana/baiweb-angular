import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, MEMBERSHIP_REGISTRATION_ENDPOINT } from 'src/app/constants';
import { CoreService } from 'src/app/core/core.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipGridService {

  constructor(private http: HttpClient,
    private coreService: CoreService,
  ) { }

  // addMemberRegistration(membershipId: number, data: any): Observable<any> {
  //   return this.http.post(`${BASE_URL}/${MEMBERSHIP_REGISTRATION_ENDPOINT}/member/${this.coreService.getMember()?.id}/ms/{membershipId}`,
  //     data,
  //     this.coreService.getHeader());
  // }

 
  getPendingMembershipReg(): Observable<any> {
    return this.http.get(`${BASE_URL}/${MEMBERSHIP_REGISTRATION_ENDPOINT}/all/pending`,
      this.coreService.getHeader());
  }

  getActiveMembershipReg(): Observable<any> {
    return this.http.get(`${BASE_URL}/${MEMBERSHIP_REGISTRATION_ENDPOINT}/all/active`,
      this.coreService.getHeader());
  }

  approve(memberRegistrationId : number): Observable<any> {
    return this.http.put(`${BASE_URL}/${MEMBERSHIP_REGISTRATION_ENDPOINT}/approve/${memberRegistrationId}`, null,
      this.coreService.getHeader());
  }
  reject(memberRegistrationId : number): Observable<any> {
    return this.http.delete(`${BASE_URL}/${MEMBERSHIP_REGISTRATION_ENDPOINT}/${memberRegistrationId}`,
      this.coreService.getHeader());
  }
}
