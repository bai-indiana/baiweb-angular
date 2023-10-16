import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { AboutComponent } from './about/about.component';
import { ByLawsComponent } from './by-laws/by-laws.component';
import { ContactComponent } from './contact/contact.component';
import { ExecutiveCommitteeComponent } from './executive-committee/executive-committee.component';
import { MemberComponent } from './member/member.component';
import { AnnouncementsComponent } from './announcements/announcements.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'announcements', pathMatch: 'full' },
      { path: 'announcements', component: AnnouncementsComponent },
    ],
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
    children: [
      { path: '', redirectTo: 'executive-committee', pathMatch: 'full' },
      { path: 'executive-committee', component: ExecutiveCommitteeComponent },
      { path: 'by-laws', component: ByLawsComponent },
    ],
  },
  {
    path: 'member',
    component: MemberComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
