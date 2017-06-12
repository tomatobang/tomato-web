/**
 * 计划的几种登陆方式
 * 1. 微信
 * 2. 微博
 * 3. 账号密码
 * 4. 手机号
 */

import { Component } from '@angular/core';
import { OnlineUserService } from '../../_core/user/index';
import { User } from '../../_core/user/user.model';

import { AppState } from '../../app.service';
import { RebirthHttpProvider } from 'rebirth-http';

import { Router } from '@angular/router';

@Component({
  selector: 'login',
  providers: [OnlineUserService],
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})

export class LoginComponent {
  user = new User()
  error = "";
  remeberMe = {
    selected: false
  };

  constructor(public service: OnlineUserService, public globalservice: AppState, 
  public rebirthProvider: RebirthHttpProvider,public router:Router) {
  }

  ngOnInit() {
    console.log('hello `login` component');
  }

  public doLogin(): void {
    console.log("doLogin", this.user);
    this.service.login(this.user).subscribe(data => {
      let retOBJ = JSON.parse(data._body);
      let status = retOBJ.status;
      let token = "";
      if (status == "success") {
        token = retOBJ.token;
      } else {
        this.error = "登陆出错！";
        return;
      }
      console.log(data);
      // 这里需要保存 token
      this.globalservice.token = token;
      this.rebirthProvider.headers({ Authorization: token });
      this.router.navigate(['/dash'], { replaceUrl: true }); 
    });
  }

  public doLogout(): void {
    this.globalservice.token = "";
  }

  public navToRegister(): void {
     this.router.navigate(['/user/register']); 
  }

}
