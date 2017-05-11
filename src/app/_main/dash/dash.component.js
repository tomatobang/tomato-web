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
var index_2 = require("../../_core/tomato/index");
var DashComponent = (function () {
    function DashComponent(taskservice, tomatoservice) {
        this.taskservice = taskservice;
        this.tomatoservice = tomatoservice;
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
                { title: "每天一个知识点", description: "学一个未知或者不懂得概念", isActive: false, num: 2 },
                { title: "锻炼", description: "为未来储蓄能量", isActive: false, num: 1 },
                { title: "代码1小时", description: "every hour lead to a change", isActive: false, num: 2 }
            ]
        };
        this.newTask = {
            title: '',
            description: '',
            num: 0
        };
        this.activeTomato = null;
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
        this.addTask = function (isActive) {
            var task = this.newTask;
            task.num = 1;
            task.isActive = isActive;
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
        var _this = this;
        this.mp3Source.setAttribute('src', '/assets/audios/alert.mp3');
        this.oggSource.setAttribute('src', '/assets/audios/alert.ogg');
        this.alertAudio.appendChild(this.mp3Source);
        this.alertAudio.appendChild(this.oggSource);
        this.alertAudio.load();
        this.taskservice.getTasks().subscribe(function (data) {
            var retStr = data && data._body;
            var dataArr = JSON.parse(retStr);
            _this.allTasks.unfinished = dataArr;
            _this.allTasks.unfinished = _this.allTasks.unfinished.slice();
        }, function (err) {
            alert(JSON.stringify(err));
            console.log('getTasks err', err);
        });
    };
    DashComponent.prototype.getTimes = function (n) {
        return new Array(n);
    };
    ;
    DashComponent.prototype.breakActiveTask = function () {
        this.activeTomato = null;
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
        this.activeTomato = task;
        this.activeTomato.startTime = new Date();
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
        this.activeTomato.num += 1;
        if (status === true) {
            // 创建tomato
            this.activeTomato.endTime = new Date();
            var tomato = {
                userid: 'test',
                taskid: this.activeTomato._id,
                title: this.activeTomato.title,
                description: this.activeTomato.description,
                startTime: this.activeTomato.startTime,
                endTime: this.activeTomato.endTime,
                num: this.activeTomato.num,
                breakTime: 0
            };
            this.tomatoservice.CreateTomato(tomato).subscribe(function (data) {
            }, function (err) {
                alert(JSON.stringify(err));
                console.log('CreateTomato err', err);
            });
            this.allTasks.finished.push(this.activeTomato);
            this.removeTask(this.activeTomato);
        }
        this.timerStatus.reset();
        this.activeTomato = null;
        this.modal.close();
        Piecon.reset();
    };
    DashComponent.prototype.removeTaskFromActiveList = function (task) {
        task.isActive = false;
        this.updateTask(task);
        this.allTasks.unfinished = this.allTasks.unfinished.slice();
    };
    DashComponent.prototype.addTaskToActiveList = function (task) {
        task.isActive = true;
        this.updateTask(task);
        this.allTasks.unfinished = this.allTasks.unfinished.slice();
    };
    DashComponent.prototype.updateTask = function (task) {
        this.taskservice.updateTask(task._id, task).subscribe(function (data) {
        }, function (err) {
            alert(JSON.stringify(err));
            console.log('updateTask err', err);
        });
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
        providers: [index_1.OnlineTaskService, index_2.OnlineTomatoService],
        templateUrl: './dash.component.html',
        styleUrls: [
            './dash.component.css'
        ]
    }),
    __metadata("design:paramtypes", [index_1.OnlineTaskService, index_2.OnlineTomatoService])
], DashComponent);
exports.DashComponent = DashComponent;
//# sourceMappingURL=dash.component.js.map