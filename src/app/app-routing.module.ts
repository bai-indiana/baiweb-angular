import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { AboutComponent } from './about/about.component';
import { ByLawsComponent } from './by-laws/by-laws.component';
import { ContactComponent } from './contact/contact.component';
import { ExecutiveCommitteeComponent } from './executive-committee/executive-committee.component';
import { MemberComponent } from './member/member.component';
import { RegistrationComponent } from './member/registration/registration.component';
import { LoginComponent } from './member/login/login.component';
import { MembershipRegComponent } from './member/membership-registration/membership.reg.component';
import { ProfileComponent } from './member/profile/profile.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { MembershipGridComponent } from './member/membership/grid/membership.grid.component';
import { UsersComponent } from './member/registration/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'executive-committee',
    component: ExecutiveCommitteeComponent,
  },
  {
    path: 'by-laws',
    component: ByLawsComponent,
  },
  {
    path: 'member',
    component: MemberComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'membership-reg',
    component: MembershipRegComponent,
  },
  {
    path: 'membership-grid',
    component: MembershipGridComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'announcements',
    component: AnnouncementsComponent,
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
