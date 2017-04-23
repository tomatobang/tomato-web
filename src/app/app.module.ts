import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { NavComponent }  from './_main/nav/nav.component';
import { DashComponent }  from './_main/dash/dash.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent,NavComponent,DashComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }