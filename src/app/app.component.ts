import { Component } from '@angular/core';
declare var Notification: any;

@Component({
  selector: 'my-app',
  template: `<tomato-nav></tomato-nav><tomato-dash></tomato-dash>`,
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent {
  name = 'TOMATOBANG';
}
