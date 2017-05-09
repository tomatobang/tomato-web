import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// https://github.com/dougludlow/ng2-bs3-modal
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent }  from './app.component';
import { NavComponent }  from './_main/nav/nav.component';
import { DashComponent }  from './_main/dash/dash.component';
import { AngularRoundProgressComponent }  from './_directives/angular-round-progress-directive';
import { TaskPipe } from './_pipe/taskPipe';
import { RebirthHttpModule } from 'rebirth-http';
import { RebirthStorageModule } from 'rebirth-storage';

@NgModule({
  imports:      [ BrowserModule,Ng2Bs3ModalModule,FormsModule,RebirthHttpModule,RebirthStorageModule],
  declarations: [ AppComponent,NavComponent,DashComponent,AngularRoundProgressComponent,TaskPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
