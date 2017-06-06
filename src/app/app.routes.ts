import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './_main/dash/';
import { AboutComponent } from './_main/about/';
import { HistoryComponent } from './_main/history/';

export const ROUTES: Routes = [
  { path: '',      component: DashComponent },
  { path: 'dash',  component: DashComponent },
  { path: 'history',  component: HistoryComponent },
  { path: 'about', component: AboutComponent },
  { path: '**',    component: DashComponent }
];
