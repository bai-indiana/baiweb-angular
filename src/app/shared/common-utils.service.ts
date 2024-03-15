import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

  constructor(private datePipe: DatePipe) { }

  convertTo12HourFormat(time24: string): string {
    if(time24){
      const [hours, min] = time24.toString().split(',');
      const suffix = parseInt(hours) >= 12 ? 'PM' : 'AM';
      const hours12 = ((parseInt(hours) + 11) % 12 + 1).toString();
      const minutes = parseInt(min).toString().padEnd(2, '0');
      return `${hours12}:${minutes} ${suffix}`;
    }
    return 'No time mentioned!!';
  }

  eventDateFormatter(dateString: string): string {
    if(dateString){
    // Parse the date string into a JavaScript Date object
    const dateParts = dateString.toString().split(',');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Month is zero-based in JavaScript Date objects
    const day = parseInt(dateParts[2]);
    const date = new Date(year, month, day);

    // Format the date using DatePipe
    const formattedDate = this.datePipe.transform(date, 'EEEE, MMMM dd, yyyy');

    return formattedDate || 'Invalid Date'; // Handle invalid date strings
  }
  return 'No date mentioned!!';
  }
  
}
