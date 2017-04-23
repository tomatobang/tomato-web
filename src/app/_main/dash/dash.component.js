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
var DashComponent = (function () {
    function DashComponent() {
        this.mp3Source = document.createElement('source');
        this.oggSource = document.createElement('source');
        this.alertAudio = document.createElement('audio');
        this.mytimeout = null;
        this.config = {
            desktopNotification: false
        };
        this.allTasks = {
            finished: Array,
            unfinished: [
                { title: "吃饭", description: "使用 CoffeeScript 和 Sass 来写 Javascript 和 Css 提高开发效率", today: false, used_pomodoro: 2 },
                { title: "睡觉", description: "一切都需要从先上传一个头像开始", today: false, used_pomodoro: 1 },
                { title: "打豆豆", description: "Matz 曾说过“你应该升级到 Ruby 2.0 了”", today: false, used_pomodoro: 2 }
            ]
        };
        this.activeTask = {
            title: '学习新知识点',
            description: '无'
        };
        this.timerStatus = {
            label: '25:00',
            percentage: 0,
            count: 0,
            reset: function () {
                this.count = 0;
                this.percentage = 0;
                this.label = "25:00";
            }
        };
    }
    DashComponent.prototype.ngOnInit = function () {
        this.mp3Source.setAttribute('src', '/assets/audios/alert.mp3');
        this.oggSource.setAttribute('src', '/assets/audios/alert.ogg');
        this.alertAudio.appendChild(this.mp3Source);
        this.alertAudio.appendChild(this.oggSource);
        this.alertAudio.load();
    };
    DashComponent.prototype.getTimes = function (n) {
        return new Array(n);
    };
    ;
    DashComponent.prototype.breakActiveTask = function () {
        this.activeTask = null;
        this.stopTimer();
        Piecon.reset();
    };
    DashComponent.prototype.onTimeout = function () {
        this.timerStatus.count++;
        this.timerStatus.percentage = this.timerStatus.count / (25 * 60);
        this.timerStatus.label = this.secondsToMMSS(25 * 60 - this.timerStatus.count);
        if (this.timerStatus.percentage >= 1) {
            this.askForFinishStatus();
            this.alertAudio.play();
            if (this.config.desktopNotification) {
                this.showDesktopNotification();
            }
        }
        else {
            this.mytimeout = setTimeout(this.onTimeout, 1000);
        }
        Piecon.setProgress(Math.floor(this.timerStatus.percentage * 100));
    };
    ;
    DashComponent.prototype.startTimer = function () {
        if (typeof this.mytimeout !== "undefined") {
            clearTimeout(this.mytimeout);
            this.timerStatus.reset();
        }
        this.mytimeout = setTimeout(this.onTimeout, 1000);
    };
    ;
    DashComponent.prototype.stopTimer = function () {
        clearTimeout(this.mytimeout);
        this.timerStatus.reset();
    };
    ;
    DashComponent.prototype.removeTask = function (task) {
        for (var index in this.allTasks.unfinished) {
            if (this.allTasks.unfinished[index] === task) {
                var ind = new Number(index);
                this.allTasks.unfinished.splice(ind.valueOf(), 1);
            }
        }
    };
    ;
    DashComponent.prototype.startTask = function (task) {
        this.activeTask = task;
        this.startTimer();
    };
    ;
    DashComponent.prototype.secondsToMMSS = function (timeInSeconds) {
        var minutes = Math.floor(timeInSeconds / 60);
        var seconds = timeInSeconds - minutes * 60;
        var retStr = '';
        if (minutes < 10) {
            retStr += "0" + minutes;
        }
        if (seconds < 10) {
            retStr += "0" + seconds;
        }
        return retStr;
    };
    ;
    DashComponent.prototype.askForFinishStatus = function () {
        // var modalInstance = $modal.open({
        //     templateUrl: 'askForFinishStatus.html',
        //     keyboard: false,
        //     controller: 'askForFinishStatusController'
        // });
        // modalInstance.result.then(function (status:boolean) {
        //     this.activeTask.used_pomodoro += 1;
        //     if (status === true) {
        //         this.allTasks.finished.push(this.activeTask);
        //         this.removeTask(this.activeTask);
        //     }
        //     this.timerStatus.reset();
        //     this.activeTask = null;
        // });
    };
    ;
    DashComponent.prototype.showDesktopNotification = function () {
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
    return DashComponent;
}());
DashComponent = __decorate([
    core_1.Component({
        selector: 'tomato-dash',
        templateUrl: "./dash.component.html",
        styleUrls: [
            './dash.component.css'
        ]
    }),
    __metadata("design:paramtypes", [])
], DashComponent);
exports.DashComponent = DashComponent;
//# sourceMappingURL=dash.component.js.map