import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // stage url
  // private apiUrl = 'https://bai-backend-service-stage.whiteriver-6da5cceb.eastus.azurecontainerapps.io//contact/message';
  //prod url
  private apiUrl = 'https://bai-backend-service.whiteriver-6da5cceb.eastus.azurecontainerapps.io/contact/message';
  // host url
  // private apiUrl = 'http://localhost:8080/contact/message';

  constructor(private http: HttpClient) { }

  submitContactForm(name: string, email: string, message: string) {
    const params = new HttpParams()
      .set('name', name)
      .set('emailId', email)
      .set('message', message);

    return this.http.post(this.apiUrl, null, { params, responseType: "text" });
  }
}
