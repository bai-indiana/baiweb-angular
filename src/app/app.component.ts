import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './shared/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'baiweb-angular';

  isLoading = false;
  private loadingSubscription: Subscription;

  constructor(private loadingService: LoadingService) {
      this.loadingSubscription = this.loadingService.isLoading.subscribe((isLoading: boolean) => {
          this.isLoading = isLoading;
      });
  }

  ngOnDestroy() {
      this.loadingSubscription.unsubscribe();
  }
}
