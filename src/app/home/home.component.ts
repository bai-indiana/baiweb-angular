import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../shared/loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loadingService: LoadingService) {
    this.fetchData();
  }

  ngOnInit(): void { }

  fetchData() {
    this.loadingService.show();
    // Perform data fetching logic
    // After data is fetched, hide loading screen
    //alert('show');
    setTimeout(() => {
      // Code to execute after the delay (e.g., 3 seconds)
      console.log('Delayed initialization');
    }, 10000); // 3000 milliseconds = 10 seconds
    //alert('hide');
    this.loadingService.hide();
}  
}
