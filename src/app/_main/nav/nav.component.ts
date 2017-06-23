import { Component } from '@angular/core';

declare var Notification: any;
import { AppState } from '../../app.service';

@Component({
    selector: 'tomato-nav',
    templateUrl: `./nav.component.html`,
    providers: [AppState],
    styleUrls: [
        './nav.component.css'
    ]
})
export class NavComponent {
    selectIndex:number =1;
    login:boolean = false;
    userinfo ={
        username:""
    };
    config = {
        desktopNotification: false
    };

    constructor(public globalservice:AppState){
        
    }

    ngOnInit() {
        //　这里还得接收事件发布信息，用户有可能进行登录操作
        this.globalservice.userinfostate.subscribe(data =>{
            if(data){
                let userinfo = JSON.parse(data);
                this.login= true;
                this.userinfo.username = userinfo.username;
            }else{
                this.login= false;
                 this.userinfo.username = "";
            }
        });
        var userlogin = this.globalservice.userinfo;
        if(userlogin){
            this.login= true;
            this.userinfo.username = userlogin.username;
        }
        if (Notification.permission !== 'denied' || Notification.permission !== 'granted') {
            this.config.desktopNotification = false;
        }
    }

    onSelectIndex(index:number){
        this.selectIndex  = index;
    }

    requestNotificationPermission() {
        this.config.desktopNotification = !this.config.desktopNotification;
        if (Notification.permission !== 'denied' || Notification.permission !== 'granted') {
            Notification.requestPermission(function (permission: any) {
                // if (!(permission in Notification)) {
                //     Notification.permission = permission;
                // }
            });
        }
    }

    /**
     * 退出
     */
    logout(){
        this.globalservice.userinfo="";
        this.globalservice.token="";
        this.userinfo.username="";
    }
}
