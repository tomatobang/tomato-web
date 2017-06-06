import { Component } from '@angular/core';

declare var Notification: any;

@Component({
    selector: 'tomato-nav',
    templateUrl: `./nav.component.html`,
    styleUrls: [
        './nav.component.css'
    ]
})
export class NavComponent {
    selectIndex:number =1;
    config = {
        desktopNotification: false
    };

    ngOnInit() {
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
}
