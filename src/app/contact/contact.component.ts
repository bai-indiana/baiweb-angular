import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact = { name: '', emailId: '', message: '' };
  apiResponse: string = '';

  constructor(private contactService: ContactService) {}

  errorMessage: string = '';
  hasError: boolean = false;

  validateAndSubmitContactUsForm() {

    this.errorMessage = ''; // Clear previous error message
    this.hasError = false;  // Reset the error flag

    if (!this.contact.name || !this.contact.emailId || !this.contact.message) {
      this.errorMessage = 'Please fill in all fields.';
      this.hasError = true;  // Set the error flag to true
      return;
    }

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.contact.emailId)) {
      this.errorMessage = 'Please enter a valid email address.';
      this.hasError = true;  // Set the error flag to true
      return;
    }

    // If all validations pass, you can submit the form
    this.submitForm();
  }


  submitForm() {
    if (this.contact.name && this.contact.emailId && this.contact.message) {
      // Call the service to submit the form and handle the API response
      this.contactService.submitContactForm(this.contact.name, this.contact.emailId, this.contact.message)
        .subscribe((response) => {
          this.apiResponse = response.toString();
        });
    }
  }
}
