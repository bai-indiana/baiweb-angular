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
import { RegistrationComponent } from './member/registration/registration.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { CommonService } from './shared/common.service';
import { RegistrationService } from './member/registration/registration.service';
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from './shared/customDateAdapter ';
import { LoginComponent } from './member/login/login.component';
import { ProfileComponent } from './member/profile/profile.component';
import { AlertComponent } from './shared/alert/alert.component';
import { DatePipe } from '@angular/common';
import { PasswordComponent } from './member/profile/password/password/password.component';
import { FamilyComponent } from './member/profile/family/family.component';
import { FamilyGridComponent } from './member/profile/family/grid/family.grid.component';


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
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    AlertComponent,
    PasswordComponent,
    FamilyComponent,
    FamilyGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [
    ContactService,
    CommonService,
    RegistrationService,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
