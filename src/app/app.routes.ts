import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './_main/dash/';
import { AboutComponent } from './_main/about/';
import { SettingComponent } from './_main/setting/';
import { HistoryComponent } from './_main/history/';

import { UserModule } from './_user/user.module';

export function loadUserModule() {
	return UserModule;
}


export const ROUTES: Routes = [
  { path: '',      component: DashComponent },
  { path: 'dash',  component: DashComponent },
  { path: 'history',  component: HistoryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'setting', component: SettingComponent },
  
  {
		path:'user',
    // JIT 支持的方式，可以用于调试
		//loadChildren:loadUserModule
    // AOT 支持的方式，用于发布
    loadChildren:'./_user/user.module#UserModule'
	},
  { path: '**',  	loadChildren:loadUserModule}
];
