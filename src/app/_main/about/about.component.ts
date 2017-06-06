import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about',
  styleUrls: ['./about.component.css'],
  templateUrl: './about.component.html',
})

export class AboutComponent {

  constructor(public route: ActivatedRoute) {
  }
  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
      });
    console.log('hello `About` component');
  }

}
