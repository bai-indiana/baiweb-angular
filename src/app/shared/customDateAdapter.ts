import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  
  override format(date: Date, displayFormat: Object): string {
 
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
     
      return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
 
    return date.toDateString();
  }
}