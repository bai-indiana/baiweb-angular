import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { AboutComponent } from './about/about.component';
import { MemberComponent } from './member/member.component';
import { ContactComponent } from './contact/contact.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ExecutiveCommitteeComponent } from './executive-committee/executive-committee.component';
import { ByLawsComponent } from './by-laws/by-laws.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ContactService } from './contact/contact.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventsComponent,
    AboutComponent,
    MemberComponent,
    ContactComponent,
    AnnouncementsComponent,
    ExecutiveCommitteeComponent,
    ByLawsComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
