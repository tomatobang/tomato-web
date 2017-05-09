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
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var angular_round_progress_directive_1 = require("../../_directives/angular-round-progress-directive");
var index_1 = require("../../_core/task/index");
var DashComponent = (function () {
    function DashComponent(service) {
        this.service = service;
        this.mp3Source = document.createElement('source');
        this.oggSource = document.createElement('source');
        this.alertAudio = document.createElement('audio');
        this.mytimeout = null;
        this.config = {
            desktopNotification: true
        };
        this.allTasks = {
            finished: new Array,
            unfinished: [
                { title: "每天一个知识点", description: "学一个未知或者不懂得概念", today: false, used_pomodoro: 2 },
                { title: "锻炼", description: "为未来储蓄能量", today: false, used_pomodoro: 1 },
                { title: "代码1小时", description: "every hour lead to a change", today: false, used_pomodoro: 2 }
            ]
        };
        this.newTask = {
            title: '',
            description: '',
            used_pomodoro: 0
        };
        this.activeTask = null;
        this.timerStatus = {
            label: '1:00',
            percentage: 0,
            count: 0,
            reset: function () {
                this.count = 0;
                this.percentage = 0;
                this.label = "1:00";
            }
        };
        this.addTask = function (today) {
            var task = this.newTask;
            task.used_pomodoro = 1;
            task.today = today;
            var tt = this.allTasks.unfinished;
            // replace push to trigger the event
            this.allTasks.unfinished = [task].concat(tt);
            this.newTask = {};
            this.openNewTaskForm = false;
        };
    }
    DashComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setInterval(function () {
            _this.child.timerStatusValue == _this.timerStatus;
            _this.child.render();
        }, 1000);
    };
    DashComponent.prototype.ngOnInit = function () {
        this.mp3Source.setAttribute('src', '/assets/audios/alert.mp3');
        this.oggSource.setAttribute('src', '/assets/audios/alert.ogg');
        this.alertAudio.appendChild(this.mp3Source);
        this.alertAudio.appendChild(this.oggSource);
        this.alertAudio.load();
        this.service.getTasks().subscribe(function (data) {
            debugger;
        });
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
        this.timerStatus.percentage = this.timerStatus.count / (1 * 60);
        this.timerStatus.label = this.secondsToMMSS(1 * 60 - this.timerStatus.count);
        if (this.timerStatus.percentage >= 1) {
            this.askForFinishStatus();
            this.alertAudio.play();
            if (this.config.desktopNotification) {
                this.showDesktopNotification();
            }
        }
        else {
            this.mytimeout = setTimeout(this.onTimeout.bind(this), 1000);
        }
        Piecon.setProgress(Math.floor(this.timerStatus.percentage * 100));
    };
    ;
    DashComponent.prototype.startTimer = function () {
        if (typeof this.mytimeout !== "undefined") {
            clearTimeout(this.mytimeout);
            this.timerStatus.reset();
        }
        this.mytimeout = setTimeout(this.onTimeout.bind(this), 1000);
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
                this.allTasks.unfinished = this.allTasks.unfinished.slice();
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
        else {
            retStr += minutes;
        }
        retStr += ":";
        if (seconds < 10) {
            retStr += "0" + seconds;
        }
        else {
            retStr += seconds;
        }
        return retStr;
    };
    ;
    DashComponent.prototype.askForFinishStatus = function () {
        this.modal.open();
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
    DashComponent.prototype.close = function (status) {
        this.activeTask.used_pomodoro += 1;
        if (status === true) {
            this.allTasks.finished.push(this.activeTask);
            this.removeTask(this.activeTask);
        }
        this.timerStatus.reset();
        this.activeTask = null;
        this.modal.close();
        Piecon.reset();
    };
    DashComponent.prototype.removeTaskFromToday = function (task) {
        task.today = false;
        this.allTasks.unfinished = this.allTasks.unfinished.slice();
    };
    DashComponent.prototype.addTaskToToday = function (task) {
        task.today = true;
        this.allTasks.unfinished = this.allTasks.unfinished.slice();
    };
    return DashComponent;
}());
__decorate([
    core_1.ViewChild('myModal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], DashComponent.prototype, "modal", void 0);
__decorate([
    core_1.ViewChild(angular_round_progress_directive_1.AngularRoundProgressComponent),
    __metadata("design:type", angular_round_progress_directive_1.AngularRoundProgressComponent)
], DashComponent.prototype, "child", void 0);
DashComponent = __decorate([
    core_1.Component({
        selector: 'tomato-dash',
        providers: [index_1.OnlineTaskService],
        templateUrl: './dash.component.html',
        styleUrls: [
            './dash.component.css'
        ]
    }),
    __metadata("design:paramtypes", [index_1.OnlineTaskService])
], DashComponent);
exports.DashComponent = DashComponent;
//# sourceMappingURL=dash.component.js.map