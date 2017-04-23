import { Component } from '@angular/core';
declare var Notification: any;
declare var chrome: any;

@Component({
  selector: 'my-app',
  template: `<tomato-nav></tomato-nav>`,
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent {
  name = 'Angular';

  showDesktopNotification() {
    if (chrome) {
      new Notification("恭喜你,又完成了一个番茄钟!", { icon: "./assets/image/notification-icon.jpg" });
    }
    else {
      Notification.requestPermission(function (permission: any) {
        if (permission == 'granted') {
          new Notification("恭喜你,又完成了一个番茄钟!", { icon: "./assets/image/notification-icon.jpg" });
        }
      });
    }
  }
}
