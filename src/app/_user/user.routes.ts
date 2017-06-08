import {RouterModule} from "@angular/router";
import { LoginComponent } from './login/';
import { RegisterComponent } from './register/';

import { UserComponent } from './user.component';


export const userRoutes = [
  	{
		path:'',
		component:UserComponent,
	    children: [
            { path: '', redirectTo:'login',pathMatch:'full'},
	    	{ path: 'login', component: LoginComponent },
	    	{ path: 'register', component: RegisterComponent },
			{ path:'**', redirectTo:'login' }
	    ]
	}
];