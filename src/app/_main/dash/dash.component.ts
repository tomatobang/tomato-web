import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

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
            { title: "吃饭", description: "使用 CoffeeScript 和 Sass 来写 Javascript 和 Css 提高开发效率", today: false, used_pomodoro: 2 },
            { title: "睡觉", description: "一切都需要从先上传一个头像开始", today: false, used_pomodoro: 1 },
            { title: "打豆豆", description: "Matz 曾说过“你应该升级到 Ruby 2.0 了”", today: false, used_pomodoro: 2 }
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


    activeTask = {
        title: '学习新知识点',
        description: '无',
        used_pomodoro: 0
    };

    timerStatus = {
        label: '25:00',
        percentage: 0,
        count: 0,
        reset: function () {
            this.count = 0;
            this.percentage = 0;
            this.label = "25:00";
        }
    };

    breakActiveTask() {
        this.activeTask = null;
        this.stopTimer();
        Piecon.reset();
    }

    onTimeout() {
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

    startTimer() {
        if (typeof this.mytimeout !== "undefined") {
            clearTimeout(this.mytimeout);
            this.timerStatus.reset();
        }
        this.mytimeout = setTimeout(this.onTimeout, 1000);
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
        }
        if (seconds < 10) {
            retStr += "0" + seconds
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
    };
}