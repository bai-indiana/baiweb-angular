import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  
  @Input() type: string | undefined;
  @Output() onClose = new EventEmitter<any>();

  constructor(){

  }

  ngOnInit(): void {
    
  }

  close(){
    this.onClose.emit();
  }

  

 
 

}
