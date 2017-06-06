import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './_main/dash/';
import { AboutComponent } from './_main/about/';


export const ROUTES: Routes = [
  { path: '',      component: DashComponent },
  { path: 'dash',  component: DashComponent },
  { path: 'about', component: AboutComponent },
  { path: '**',    component: DashComponent }
];
