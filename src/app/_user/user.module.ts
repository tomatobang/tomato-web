import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { LoginComponent } from './login/';
import { RegisterComponent } from './register/';
import { UserComponent } from './user.component';

import { userRoutes } from './user.routes';
import { AppState } from '../app.service';

@NgModule({
  declarations: [
    UserComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    LoginComponent
  ],
  providers:[AppState]
})
export class UserModule { }