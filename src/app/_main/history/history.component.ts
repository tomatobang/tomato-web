import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { OnlineTomatoService } from "../../_core/tomato/index";
import { AppState } from "../../app.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "history",
  styleUrls: [`./history.component.css`],
  providers: [OnlineTomatoService],
  templateUrl: "./history.component.html"
})
export class HistoryComponent {
  tomatos: Array<any> = [];

  constructor(
    public route: ActivatedRoute,
    public servive: OnlineTomatoService,
    public globalservice: AppState
  ) {}

  userinfostateSubscription: Subscription;
  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      // your resolved data from route
    });
    console.log("hello `history` component");
    if (this.userinfostateSubscription) {
      this.userinfostateSubscription.unsubscribe();
    }
    this.globalservice.userinfostate.subscribe(data => {
      this.loadTomatos();
    });

    this.globalservice.tomatoState.subscribe(data => {
      this.loadTomatos();
    });
    this.loadTomatos();
  }

  loadTomatos() {
    this.servive.getTomatos().subscribe((data: any) => {
      this.tomatos = JSON.parse(data._body);
    });
  }
}
