import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, MEMBERSHIP_REGISTRATION_ENDPOINT } from 'src/app/constants';
import { CoreService } from 'src/app/core/core.service';

@Injectable({
  providedIn: 'root'
})
export class RenewService {

  constructor(private http: HttpClient,
    private coreService: CoreService,
  ) { }

  addMemberRegistration(membershipId: number, data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/${MEMBERSHIP_REGISTRATION_ENDPOINT}/member/${this.coreService.getMember()?.id}/ms/${membershipId}`,
      data,
      this.coreService.getHeader());
  }

 
 
}

