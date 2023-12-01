import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL, FAMILY_ENDPOINT } from 'src/app/constants';
import { CoreService } from 'src/app/core/core.service';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(private http: HttpClient,
    private coreService : CoreService,
    ) {}

  add(data: any ): Observable<any> {
    return this.http.post(`${BASE_URL}/${FAMILY_ENDPOINT}/m=${this.coreService.getMember()?.id}`, data, this.coreService.getHeader());
  }
}
