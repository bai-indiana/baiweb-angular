import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from './contact.service';
import { CommonService } from '../shared/common.service';
import { Client } from '../shared/client.model';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  clientData: Client | any;

  constructor(private contactService: ContactService,
    private commonService: CommonService) { }
  //Retrieve client system details
  ngOnInit(): void {
    if(this.clientData){
      this.commonService.getClientSystemData().subscribe((data) => {
        this.clientData = data;
      });
    }

  }

  contact = { name: '', emailId: '', phone: '', message: '' };
  isProcessing: boolean = false;
  apiResponse: string = '';



  errorMessage: string = '';
  hasError: boolean = false;


  validateAndSubmitContactUsForm() {
    this.apiResponse = '';
    this.errorMessage = ''; // Clear previous error message
    this.hasError = false;  // Reset the error flag

    if (!this.contact.name || !this.contact.emailId || !this.contact.phone || !this.contact.message) {
      this.errorMessage = 'Please fill in all fields.';
      this.hasError = true;  // Set the error flag to true
      return;
    }

    // Regular expression to validate a phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(this.contact.phone)) {
      this.errorMessage = 'Please enter a valid phone number.';
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
    // Display the processing icon and freeze the page
    this.isProcessing = true;

    if (this.contact.name && this.contact.emailId && this.contact.phone && this.contact.message) {
      // Call the service to submit the form and handle the API response
      this.contactService.submitContactForm(this.clientData, this.contact.name, this.contact.emailId, this.contact.phone, this.contact.message)
        .subscribe((response) => {
          this.apiResponse = response.toString();

          this.contact.emailId = this.contact.name = this.contact.phone = '';

          // Handle the API response here
          this.isProcessing = false; // Hide the processing icon
        },
          (error) => {
            // Handle the error response here
            this.apiResponse = 'An error occurred. Please try again later. Or send an email to ec@baiweb.org';

            this.isProcessing = false; // Hide the processing icon
            // Handle the error, display an error message, etc.
          }
        );
    }
  }
}
