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

@Component({
  selector: 'login',
  providers: [OnlineUserService],
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})

export class LoginComponent {
  user = new User()
  error = "";

  constructor(public service: OnlineUserService) {
  }

  ngOnInit() {
    console.log('hello `login` component');
  }

  public doLogin(): void {
    console.log(this.user);
    debugger;
    // this.service.login(this.user).subscribe(data =>{
    //   console.log(data);
    //   // 这里需要保存 token
    // });
  }

  public doLogout(): void {
    // this.service.logout();
  }

  public forgetPwd(): void {
  }

}
