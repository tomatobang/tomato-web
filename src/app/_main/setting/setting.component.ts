import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'setting',
  styleUrls: ['./setting.component.css'],
  templateUrl: './setting.component.html',
})

export class SettingComponent {

  constructor(public route: ActivatedRoute) {
  }
  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
      });
    console.log('hello `Setting` component');
  }

}
