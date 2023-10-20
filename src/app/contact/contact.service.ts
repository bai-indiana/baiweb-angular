import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://baiweb-backend.azurewebsites.net/contact/message';

  constructor(private http: HttpClient) { }

  submitContactForm(name: string, email: string, message: string) {
    const params = new HttpParams()
      .set('name', name)
      .set('emailId', email)
      .set('message', message);

    return this.http.post(this.apiUrl, null, { params,responseType: "text" } );
  }
}
