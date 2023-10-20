import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

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
