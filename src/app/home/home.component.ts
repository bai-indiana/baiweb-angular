import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
  
  
  name: string = '';
  emailId: string = '';
  message: string = '';
  errorMessage: string = '';
  hasError: boolean = false;

  validateAndSubmitContactUsForm() {

    this.errorMessage = ''; // Clear previous error message
    this.hasError = false;  // Reset the error flag

    if (!this.name || !this.emailId || !this.message) {
      this.errorMessage = 'Please fill in all fields.';
      this.hasError = true;  // Set the error flag to true
      return;
    }

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailId)) {
      this.errorMessage = 'Please enter a valid email address.';
      this.hasError = true;  // Set the error flag to true
      return;
    }

    // If all validations pass, you can submit the form
    this.submitContactUs();
  }

  submitContactUs() {
    // Implement your submission logic here
    // You can make an HTTP request to a backend service, for example
  }

  shareLink() {
    if (navigator.share) {
      navigator.share({
        title: 'Events',
        text: 'Bengali Association Events',
        url: window.location.href + '#events'
      })
        .then(() => {
          console.log('Successfully shared.');
        })
        .catch((error) => {
          console.error('Error sharing:', error);
        });
    } else {
      // Copy the URL to the clipboard
      this.copyURLToClipboard();
      alert('Your browser does not support sharing. Url already topied to your clip board you can paste to any where.');
    }
  }

  copyURLToClipboard() {
    const urlToCopy = window.location.href + '#events';
    const textArea = document.createElement('textarea');
    textArea.value = urlToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}
