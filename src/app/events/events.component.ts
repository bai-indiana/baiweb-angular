import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core/core.service';
import { EventsService } from './events.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BACKEND_SYS_ERROR } from '../constants';
import { CustomDateAdapter } from '../shared/customDateAdapter';
import { CommonUtilsService } from '../shared/common-utils.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  errorMessage: string = '';
  hasError: boolean = false;

// Define a list of Event objects
events: any;

  constructor(
    private _coreService: CoreService,
    private eventsService: EventsService,
    private commonUtilsService: CommonUtilsService

  ) {

   }

  ngOnInit(): void {
    this.getLatestEvents();
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
 
  getLatestEvents(){
    this.eventsService.getLatestEvents().subscribe({
      next:(res )=>{
        this.events = res;
      },
      error: (err: any) => {
        this.handleError('Error fetching pending membership!! ', err);
      },
    })
  }

  convertTo12HourFormat(time24: string): string {
    return this.commonUtilsService.convertTo12HourFormat(time24);
  }

  eventDateFormatter(time24: string): string {
    return this.commonUtilsService.eventDateFormatter(time24);
  }

  handleError(method: string, err: HttpErrorResponse) {
    this.hasError = true;
    console.error(err.error);
    if (err.status == 403) {
      this.errorMessage = BACKEND_SYS_ERROR;
    } else {
      this.errorMessage = JSON.stringify(err.error)
        .replaceAll('{', ' ')
        .replaceAll('}', ' ')
        .replaceAll('"', ' ');
    }

  }

}
