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
    config = {
        desktopNotification: false
    };

    requestNotificationPermission() {
        this.config.desktopNotification = !this.config.desktopNotification;
        if (Notification.permission !== 'denied' || Notification.permission !== 'granted') {
            Notification.requestPermission(function (permission: any) {
                if (!(permission in Notification)) {
                    Notification.permission = permission;
                }
            });
        }
    }
}
