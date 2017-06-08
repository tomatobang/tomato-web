/**
 * 计划的几种登陆方式
 * 1. 微信
 * 2. 微博
 * 3. 账号密码
 * 4. 手机号
 */

import { Component } from '@angular/core';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})

export class LoginComponent {

  constructor() {
  }
  ngOnInit() {
    console.log('hello `login` component');
  }

}
