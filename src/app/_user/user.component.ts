import { Component, OnInit } from "@angular/core";

@Component({
  selector: "user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent {
  selectIndex: number = 1;
  constructor() {}

  ngOnInit() {}

  onSelectIndex(index: number) {
    this.selectIndex = index;
  }

  // onActivate(component:any) {
  //   console.log("组件加载完成>"+component);
  // }

  // onDeactivate(component:any) {
  //   console.log("组件已经移除>"+component);
  // }
}
