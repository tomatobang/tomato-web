import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';

declare var Notification: any;

@Directive({
    selector: 'angular-round-progress'
})
export class AngularRoundProgressComponent {
    canvas: HTMLCanvasElement;

    width: any = "450";
    height: any = "450";
    outerCircleWidth: string = "30";
    innerCircleWidth: string = "5";
    outerCircleRadius: string = "180";
    innerCircleRadius: string = "140";

    labelFont: string = "60pt Arial";
    outerCircleBackgroundColor: string = "#505769";
    outerCircleForegroundColor: string = "12eeb9";
    innerCircleColor: string = "12eeb9";

    labelColor: string = "#fff";

    @Input("timerStatus") timerStatus: any


    @Output() scroll = new EventEmitter();

    constructor(private element: ElementRef) {
        var ele = this.element.nativeElement;
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);
        ele.parentNode.replaceChild(this.canvas, ele);
    }

    ngOnInit() {
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
        ctx.fillText(this.timerStatus.label, x, y);

        // The "foreground" circle
        var startAngle = - (Math.PI / 2);
        var endAngle = ((Math.PI * 2) * this.timerStatus.percentage) - (Math.PI / 2);
        var anticlockwise = false;
        ctx.beginPath();
        ctx.arc(x, y, parseInt(this.outerCircleRadius), startAngle, endAngle, anticlockwise);
        ctx.lineWidth = parseInt(this.outerCircleWidth);
        ctx.strokeStyle = this.outerCircleForegroundColor;
        ctx.stroke();
    }
}


// /*!
//  * AngularJS Round Progress Directive
//  *
//  * Copyright 2013 Stephane Begaudeau
//  * Released under the MIT license
//  */
// angular.module('angular.directives-round-progress', []).directive('angRoundProgress', [function () {
//   var compilationFunction = function (templateElement, templateAttributes, transclude) {
//     if (templateElement.length === 1) {
//       var node = templateElement[0];

//       var width = node.getAttribute('data-round-progress-width') || '400';
//       var height = node.getAttribute('data-round-progress-height') || '400';

//       var canvas = document.createElement('canvas');
//       canvas.setAttribute('width', width);
//       canvas.setAttribute('height', height);
//       canvas.setAttribute('data-round-progress-model', node.getAttribute('data-round-progress-model'));

//       node.parentNode.replaceChild(canvas, node);

//       var outerCircleWidth = node.getAttribute('data-round-progress-outer-circle-width') || '20';
//       var innerCircleWidth = node.getAttribute('data-round-progress-inner-circle-width') || '5';

//       var outerCircleBackgroundColor = node.getAttribute('data-round-progress-outer-circle-background-color') || '#505769';
//       var outerCircleForegroundColor = node.getAttribute('data-round-progress-outer-circle-foreground-color') || '#12eeb9';
//       var innerCircleColor = node.getAttribute('data-round-progress-inner-circle-color') || '#505769';
//       var labelColor = node.getAttribute('data-round-progress-label-color') || '#12eeb9';

//       var outerCircleRadius = node.getAttribute('data-round-progress-outer-circle-radius') || '100';
//       var innerCircleRadius = node.getAttribute('data-round-progress-inner-circle-radius') || '70';

//       var labelFont = node.getAttribute('data-round-progress-label-font') || '50pt Calibri';

//       return {
//         pre: function preLink(scope, instanceElement, instanceAttributes, controller) {
//           var expression = canvas.getAttribute('data-round-progress-model');
//           scope.$watch(expression, function (newValue, oldValue) {
//             // Create the content of the canvas
//             var ctx = canvas.getContext('2d');
//             ctx.clearRect(0, 0, width, height);

//             // The "background" circle
//             var x = width / 2;
//             var y = height / 2;
//             ctx.beginPath();
//             ctx.arc(x, y, parseInt(outerCircleRadius), 0, Math.PI * 2, false);
//             ctx.lineWidth = parseInt(outerCircleWidth);
//             ctx.strokeStyle = outerCircleBackgroundColor;
//             ctx.stroke();

//             // The inner circle
//             ctx.beginPath();
//             ctx.arc(x, y, parseInt(innerCircleRadius), 0, Math.PI * 2, false);
//             ctx.lineWidth = parseInt(innerCircleWidth);
//             ctx.strokeStyle = innerCircleColor;
//             ctx.stroke();

//             // The inner number
//             ctx.font = labelFont;
//             ctx.textAlign = 'center';
//             ctx.textBaseline = 'middle';
//             ctx.fillStyle = labelColor;
//             ctx.fillText(newValue.label, x, y);

//             // The "foreground" circle
//             var startAngle = - (Math.PI / 2);
//             var endAngle = ((Math.PI * 2 ) * newValue.percentage) - (Math.PI / 2);
//             var anticlockwise = false;
//             ctx.beginPath();
//             ctx.arc(x, y, parseInt(outerCircleRadius), startAngle, endAngle, anticlockwise);
//             ctx.lineWidth = parseInt(outerCircleWidth);
//             ctx.strokeStyle = outerCircleForegroundColor;
//             ctx.stroke();
//           }, true);
//         },
//         post: function postLink(scope, instanceElement, instanceAttributes, controller) {}
//       };
//     }
//   };

//   var roundProgress = {
//     compile: compilationFunction,
//     replace: true
//   };
//   return roundProgress;
// }]);
