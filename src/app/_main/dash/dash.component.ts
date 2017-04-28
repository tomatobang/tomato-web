import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AngularRoundProgressComponent } from '../../_directives/angular-round-progress-directive';

declare var Piecon: any;
declare var chrome: any;
declare var Notification: any;

@Component({
    selector: 'tomato-dash',
    templateUrl: `./dash.component.html`,
    styleUrls: [
        './dash.component.css'
    ]
})
export class DashComponent {
    @ViewChild('myModal')
    modal: ModalComponent;

    @ViewChild(AngularRoundProgressComponent) child: AngularRoundProgressComponent;
    ngAfterViewInit() {
        setInterval(() => {
            this.child.timerStatusValue == this.timerStatus;
            this.child.render();
        }, 1000)
    }

    mp3Source: HTMLSourceElement = document.createElement('source');
    oggSource: HTMLSourceElement = document.createElement('source');
    alertAudio: HTMLAudioElement = document.createElement('audio');

    mytimeout: any = null;
    config = {
        desktopNotification: false
    };

    allTasks = {
        finished: new Array,
        unfinished: [
            { title: "每天一个知识点", description: "学一个未知或者不懂得概念", today: false, used_pomodoro: 2 },
            { title: "锻炼", description: "为未来储蓄能量", today: false, used_pomodoro: 1 },
            { title: "代码1小时", description: "every hour lead to a change", today: false, used_pomodoro: 2 }
        ]
    };

    constructor() {
    }

    ngOnInit() {
        this.mp3Source.setAttribute('src', '/assets/audios/alert.mp3');
        this.oggSource.setAttribute('src', '/assets/audios/alert.ogg');
        this.alertAudio.appendChild(this.mp3Source);
        this.alertAudio.appendChild(this.oggSource);
        this.alertAudio.load();
    }

    getTimes(n: any) {
        return new Array(n);
    };

    newTask = {
        title: '',
        description: '',
        used_pomodoro: 0
    };
    activeTask = {
        title: '学习新知识点',
        description: '无',
        used_pomodoro: 0
    };

    timerStatus = {
        label: '1:00',
        percentage: 0,
        count: 0,
        reset: function () {
            this.count = 0;
            this.percentage = 0;
            this.label = "1:00";
        }
    };

    breakActiveTask() {
        this.activeTask = null;
        this.stopTimer();
        Piecon.reset();
    }

    onTimeout() {
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

    startTimer() {
        if (typeof this.mytimeout !== "undefined") {
            clearTimeout(this.mytimeout);
            this.timerStatus.reset();
        }
        this.mytimeout = setTimeout(this.onTimeout.bind(this), 1000);
    };

    stopTimer() {
        clearTimeout(this.mytimeout);
        this.timerStatus.reset();
    };

    removeTask(task: any) {
        for (let index in this.allTasks.unfinished) {
            if (this.allTasks.unfinished[index] === task) {
                let ind = new Number(index);
                this.allTasks.unfinished.splice(ind.valueOf(), 1);
            }
        }
    };

    startTask(task: any) {
        this.activeTask = task;
        this.startTimer();
    };

    secondsToMMSS(timeInSeconds: number) {
        var minutes = Math.floor(timeInSeconds / 60);
        var seconds = timeInSeconds - minutes * 60;
        let retStr: string = ''
        if (minutes < 10) {
            retStr += "0" + minutes;
        } else {
            retStr += minutes;
        }
        retStr += ":";
        if (seconds < 10) {
            retStr += "0" + seconds
        } else {
            retStr += seconds
        }
        return retStr;
    };

    askForFinishStatus() {
        this.modal.open();
    };

    showDesktopNotification() {
        if (chrome) {
            new Notification("恭喜你,又完成了一个番茄钟!", { icon: "./assets/image/notification-icon.jpg" });
        }
        else {
            Notification.requestPermission(function (permission: any) {
                if (permission == 'granted') {
                    new Notification("恭喜你,又完成了一个番茄钟!", { icon: "./assets/image/notification-icon.jpg" });
                }
            });
        }
    }

    close(status: any) {
        this.activeTask.used_pomodoro += 1;
        if (status === true) {
            this.allTasks.finished.push(this.activeTask);
            this.removeTask(this.activeTask);
        }
        this.timerStatus.reset();
        this.activeTask = null;
        this.modal.close();
        Piecon.reset();
    }

    addTask = function (today: any) {
        let task = this.newTask;
        task.used_pomodoro = 0;
        task.today = today;
        this.allTasks.unfinished.push(task);
        this.newTask = {};
        this.openNewTaskForm = false;
    };
}