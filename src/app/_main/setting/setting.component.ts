import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppState } from '../../app.service';

@Component({
  selector: 'setting',
  styleUrls: ['./setting.component.css'],
  templateUrl: './setting.component.html',
})

export class SettingComponent {
  resttime:number;
  countdown:number;

  constructor(public route: ActivatedRoute, public globalservice: AppState) {
  }
  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
      });

    this.countdown = this.globalservice.countdown;
    this.resttime = this.globalservice.resttime;
    console.log('hello `Setting` component');
  }

  setCountdown(value:number){
    this.globalservice._countdown = value;
  }

  setResttime(value:number){
    this.globalservice.resttime = value;
  }

}
