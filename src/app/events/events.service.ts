import { Injectable } from '@angular/core';
import { BASE_URL, GET_LATEST_EVENTS } from '../constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Client } from '../shared/client.model';
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient,
    private coreService: CoreService,
  ) { }

  getLatestEvents() {
    const params = new HttpParams();
    return this.http.get(BASE_URL + GET_LATEST_EVENTS, this.coreService.getHeader());
  }
}
