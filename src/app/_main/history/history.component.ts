import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { OnlineTomatoService } from "../../_core/tomato/index";
import { AppState } from "../../app.service";
import { Subscription } from 'rxjs';

import { PagerService } from './_pager_service/index'

@Component({
  selector: "history",
  styleUrls: [`./history.component.css`],
  providers: [OnlineTomatoService],
  templateUrl: "./history.component.html"
})
export class HistoryComponent {
  tomatos: Array<any> = [];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];

  constructor(
    public route: ActivatedRoute,
    public servive: OnlineTomatoService,
    public globalservice: AppState,
    public pagerService:PagerService
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
      this.setPage(1);
    });
  }

   setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.tomatos.length, page);

        // get current page of items
        this.pagedItems = this.tomatos.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
