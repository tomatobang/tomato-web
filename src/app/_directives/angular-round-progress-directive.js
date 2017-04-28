/**
 * add by yipeng at 2017
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var AngularRoundProgressComponent = (function () {
    function AngularRoundProgressComponent(element) {
        this.element = element;
        this.width = "450";
        this.height = "450";
        this.outerCircleWidth = "30";
        this.innerCircleWidth = "5";
        this.outerCircleRadius = "180";
        this.innerCircleRadius = "140";
        this.labelFont = "60pt Arial";
        this.outerCircleBackgroundColor = "#505769";
        this.outerCircleForegroundColor = "12eeb9";
        this.innerCircleColor = "12eeb9";
        this.labelColor = "#fff";
        this.scroll = new core_1.EventEmitter();
        var ele = this.element.nativeElement;
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);
        ele.parentNode.replaceChild(this.canvas, ele);
    }
    Object.defineProperty(AngularRoundProgressComponent.prototype, "timerStatus", {
        /**
         * 只能发现
         */
        get: function () {
            return this.timerStatusValue;
        },
        set: function (val) {
            this.timerStatusValue = val;
            this.render();
        },
        enumerable: true,
        configurable: true
    });
    AngularRoundProgressComponent.prototype.render = function () {
        // Create the content of the canvas
        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.width, this.height);
        // The "background" circle
        var x = this.width / 2;
        var y = this.height / 2;
        ctx.beginPath();
        ctx.arc(x, y, parseInt(this.outerCircleRadius), 0, Math.PI * 2, false);
        ctx.lineWidth = parseInt(this.outerCircleWidth);
        ctx.strokeStyle = this.outerCircleBackgroundColor;
        ctx.stroke();
        // The inner circle
        ctx.beginPath();
        ctx.arc(x, y, parseInt(this.innerCircleRadius), 0, Math.PI * 2, false);
        ctx.lineWidth = parseInt(this.innerCircleWidth);
        ctx.strokeStyle = this.innerCircleColor;
        ctx.stroke();
        // The inner number
        ctx.font = this.labelFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.labelColor;
        ctx.fillText(this.timerStatusValue.label, x, y);
        // The "foreground" circle
        var startAngle = -(Math.PI / 2);
        var endAngle = ((Math.PI * 2) * this.timerStatusValue.percentage) - (Math.PI / 2);
        var anticlockwise = false;
        ctx.beginPath();
        ctx.arc(x, y, parseInt(this.outerCircleRadius), startAngle, endAngle, anticlockwise);
        ctx.lineWidth = parseInt(this.outerCircleWidth);
        ctx.strokeStyle = this.outerCircleForegroundColor;
        ctx.stroke();
    };
    return AngularRoundProgressComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AngularRoundProgressComponent.prototype, "timerStatus", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AngularRoundProgressComponent.prototype, "scroll", void 0);
AngularRoundProgressComponent = __decorate([
    core_1.Directive({
        selector: 'angular-round-progress'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], AngularRoundProgressComponent);
exports.AngularRoundProgressComponent = AngularRoundProgressComponent;
//# sourceMappingURL=angular-round-progress-directive.js.map