import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../constants';
import { CommonService } from '../shared/common.service';
import { Client } from '../shared/client.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService    {
  private contactApiUrl = BASE_URL + '/api/contact/message';

  constructor(private http: HttpClient) { }



  submitContactForm(client : Client, name: string, email: string, phone: string, message: string) {
    const params = new HttpParams()
      .set('name', name)
      .set('emailId', email)
      .set('phone', phone)
      .set('message', message);
    return this.http.post(this.contactApiUrl, client, { params, responseType: "text" });
  }
}
