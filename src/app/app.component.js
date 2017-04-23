"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.name = 'Angular';
    }
    AppComponent.prototype.showDesktopNotification = function () {
        if (chrome) {
            new Notification("恭喜你,又完成了一个番茄钟!", { icon: "./assets/image/notification-icon.jpg" });
        }
        else {
            Notification.requestPermission(function (permission) {
                if (permission == 'granted') {
                    new Notification("恭喜你,又完成了一个番茄钟!", { icon: "./assets/image/notification-icon.jpg" });
                }
            });
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "<tomato-nav></tomato-nav>",
        styleUrls: [
            './app.component.css'
        ]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map