import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, FAMILY_ENDPOINT, MEMBERSHIP_REGISTRATION_ENDPOINT } from 'src/app/constants';
import { CoreService } from 'src/app/core/core.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipRegService {

  constructor(private http: HttpClient,
    private coreService: CoreService,
  ) { }

  addMemberRegistration(membershipId: number, data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/${MEMBERSHIP_REGISTRATION_ENDPOINT}/member/${this.coreService.getMember()?.id}/ms/{membershipId}`,
      data,
      this.coreService.getHeader());
  }

  getMemberRegistration(membershipId: number): Observable<any> {
    return this.http.get(`${BASE_URL}/${MEMBERSHIP_REGISTRATION_ENDPOINT}/member/${this.coreService.getMember()?.id}/ms/{membershipId}`,
      this.coreService.getHeader());
  }
  getValidRegistration(): Observable<any> {
    return this.http.get(`${BASE_URL}/${MEMBERSHIP_REGISTRATION_ENDPOINT}/valid/member/${this.coreService.getMember()?.id}`,
      this.coreService.getHeader());
  }
  getMemberRegistrationHistory(): Observable<any> {
    return this.http.get(`${BASE_URL}/${MEMBERSHIP_REGISTRATION_ENDPOINT}/member/${this.coreService.getMember()?.id}`,
      this.coreService.getHeader());
  }
}

