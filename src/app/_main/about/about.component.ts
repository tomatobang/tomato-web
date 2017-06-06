import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about',
  styles: [`
  `],
  template: `
    <h1>About</h1>
    <div>
      <h3>
        <a href="https://yipeng.info" target="_blank">yipeng.info</a>@gmail.com
      </h3>
    </div>
  `
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
