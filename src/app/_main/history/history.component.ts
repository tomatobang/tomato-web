import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'history',
  styles: [``],
  template: `
    <h1>history</h1>
  `
})
export class HistoryComponent {
  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
      });
    console.log('hello `history` component');
  }

}
