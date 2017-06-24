import { Component } from "@angular/core";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User } from '../../_core/user/user.model';
import { OnlineUserService } from '../../_core/user/index';
import { Router } from '@angular/router';
import { AppState } from '../../app.service';

@Component({
  selector: "register",
  styleUrls: ["./register.component.css"],
  providers:[OnlineUserService],
  templateUrl: "./register.component.html"
})
export class RegisterComponent {
  public userForm: FormGroup;
  public userInfo: User = new User();

  public formErrors = {
    'username': '',
    'displayName':'',
    'email': '',
    'password': '',
    'confirmPassword': '',
    'formError': '',
  };
  validationMessages = {
    'username': {
      'required': '用户名必须输入。',//
      'minlength': '用户名4到32个字符。'
    },
    'displayName'    : {
      'required': '昵称必须输入。',
      'minlength': '昵称2到32个字符。'
    },
    'email': {
      'required': '邮箱必须输入。',
      'pattern': '请输入正确的邮箱地址。'
    },
    'password': {
      'required': '密码必须输入。',
      'minlength': '密码至少要6位。'
    },
    'confirmPassword': {
      'required': '重复密码必须输入。',
      'minlength': '密码至少要6位。',
      'validateEqual': "两次输入的密码不一致。"
    },
  };
  constructor(public fb: FormBuilder, public userService:OnlineUserService, public router:Router, public globalservice:AppState) {}
  ngOnInit() {
    console.log("hello `register` component");
    this.buildForm();
  }

    buildForm(): void {
    this.userForm = this.fb.group({
      "username": [
        this.userInfo.username,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32)
        ]
      ],
      "displayName": [
        this.userInfo.displayName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32)
        ]
      ],
      "email": [
        this.userInfo.email,
        [
          Validators.required,
          //Validators.pattern("^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$")
          Validators.pattern("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$")
        ]
      ],
      "password": [
        this.userInfo.password,
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ],
      "confirmPassword": [
        this.userInfo.confirmPassword,
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]
    });
    this.userForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  navToLogin() {
     this.router.navigate(['/user/login']); 
  }


  doRegister() {
    if (this.userForm.valid) {
      console.log(this.userInfo);
      this.userInfo = this.userForm.value;
      this.userService.verifyEmail({email:this.userInfo.email}).subscribe(data => {
          let ret:any = JSON.parse(data._body);
          // 邮箱可用
          if(ret.success){
            this.userService.register(this.userInfo)
            .subscribe(
              data => {
                alert("注册成功！即将跳转至登录页...");
                this.globalservice.userinfo= JSON.stringify(this.userInfo);
                this.navToLogin();
              },
              error => {
                this.formErrors.formError = error.message;
                console.error(error);
              }
            )
          }else{
             this.formErrors["email"] +=ret.msg;
          }
         
      })
    } else {
      this.formErrors.formError = "存在不合法的输入项，请检查。";
    }
  }

  testEmail() {
    // 需要验证电子邮箱是否已用
  }
}
