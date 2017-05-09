"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
// https://github.com/dougludlow/ng2-bs3-modal
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var app_component_1 = require("./app.component");
var nav_component_1 = require("./_main/nav/nav.component");
var dash_component_1 = require("./_main/dash/dash.component");
var angular_round_progress_directive_1 = require("./_directives/angular-round-progress-directive");
var taskPipe_1 = require("./_pipe/taskPipe");
var index_1 = require("rebirth-http/index"); //
var index_2 = require("rebirth-storage/dist/index"); ///dist/rebirth-storage.module
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, ng2_bs3_modal_1.Ng2Bs3ModalModule, forms_1.FormsModule, http_1.HttpModule, index_1.RebirthHttpModule, index_2.RebirthStorageModule],
        declarations: [app_component_1.AppComponent, nav_component_1.NavComponent, dash_component_1.DashComponent, angular_round_progress_directive_1.AngularRoundProgressComponent, taskPipe_1.TaskPipe],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map