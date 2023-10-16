import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact = { name: '', email: '', message: '' };
  apiResponse: string = '';

  constructor(private contactService: ContactService) {}

  submitForm() {
    if (this.contact.name && this.contact.email && this.contact.message) {
      // Call the service to submit the form and handle the API response
      this.contactService.submitContactForm(this.contact.name, this.contact.email, this.contact.message)
        .subscribe((response) => {
          this.apiResponse = response.toString();
        });
    }
  }
}
