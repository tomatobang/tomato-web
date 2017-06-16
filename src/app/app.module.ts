import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
// https://github.com/dougludlow/ng2-bs3-modal
import 'bootstrap';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { ROUTES } from './app.routes';


import { AppComponent } from './app.component';
import { NavComponent } from './_main/nav/nav.component';
import { DashComponent } from './_main/dash/dash.component';
import { AboutComponent } from './_main/about/about.component';
import { SettingComponent } from './_main/setting/setting.component';
import { HistoryComponent } from './_main/history/history.component';

import { AngularRoundProgressComponent } from './_directives/angular-round-progress-directive';
import { TimelineComponent } from './_main/timeline/';
import { TaskPipe } from './_pipe/taskPipe';
import { StringTruncate } from './_pipe/stringTruncate';

import { RebirthHttpModule } from 'rebirth-http/index';//
import { RebirthStorageModule } from 'rebirth-storage/dist/index';///dist/rebirth-storage.module

import { AppState } from './app.service';



@NgModule({
  imports: [BrowserModule, Ng2Bs3ModalModule, FormsModule, HttpModule, RebirthHttpModule, RebirthStorageModule, ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })],
  declarations: [AppComponent, NavComponent, DashComponent, AboutComponent, SettingComponent, HistoryComponent,
  AngularRoundProgressComponent, TimelineComponent, TaskPipe,StringTruncate],
  bootstrap: [AppComponent],
  providers: [AppState]
})
export class AppModule { }
