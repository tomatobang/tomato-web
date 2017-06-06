import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OnlineTomatoService } from '../../_core/tomato/index';

@Component({
  selector: 'history',
  styles: [``],
  providers: [OnlineTomatoService],
  templateUrl: './history.component.html',
})
export class HistoryComponent {
  tomatos:Array<any> = [];

  constructor(public route: ActivatedRoute, public servive :OnlineTomatoService) {
  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
      });
    console.log('hello `history` component');


    this.servive.getTomatos().subscribe((data:any) => {
      this.tomatos  = JSON.parse(data._body);
    });
  }
  
}
