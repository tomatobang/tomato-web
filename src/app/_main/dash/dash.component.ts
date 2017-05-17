import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AngularRoundProgressComponent } from '../../_directives/angular-round-progress-directive';

import { OnlineTaskService } from '../../_core/task/index';
import { OnlineTomatoService } from '../../_core/tomato/index';
// import { OnlineUserService } from '../../_core/user/index';

declare var Piecon: any;
declare var chrome: any;
declare var Notification: any;

@Component({
    selector: 'tomato-dash',
    providers: [OnlineTaskService, OnlineTomatoService],
    templateUrl: './dash.component.html',
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
        desktopNotification: true
    };
    openNewTaskForm = false;
    allTasks = {
        finished: new Array,
        unfinished: [
            { title: "每天一个知识点", description: "学一个未知或者不懂得概念", isActive: false, num: 2 },
            { title: "锻炼", description: "为未来储蓄能量", isActive: false, num: 1 },
            { title: "代码1小时", description: "every hour lead to a change", isActive: false, num: 2 }
        ]
    };

    constructor(public taskservice: OnlineTaskService, public tomatoservice: OnlineTomatoService) {//, public userservice: OnlineUserService
    }

    ngOnInit() {
        this.mp3Source.setAttribute('src', '/assets/audios/alert.mp3');
        this.oggSource.setAttribute('src', '/assets/audios/alert.ogg');
        this.alertAudio.appendChild(this.mp3Source);
        this.alertAudio.appendChild(this.oggSource);
        this.alertAudio.load();

        this.taskservice.getTasks().subscribe(data => {
            const retStr = data && data._body;
            const dataArr = JSON.parse(retStr);
            this.allTasks.unfinished = dataArr;
            this.allTasks.unfinished = this.allTasks.unfinished.slice();
        }, err => {
            alert(JSON.stringify(err));
            console.log('getTasks err', err);
        })
    }

    getTimes(n: any) {
        return new Array(n);
    };

    newTask = {
        title: '',
        description: '',
        num: 0
    };
    activeTomato: any = null;

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
        this.activeTomato = null;
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
                // 删除任务
                this.taskservice.deleteTask(task._id).subscribe(data => {
                });
                this.allTasks.unfinished.splice(ind.valueOf(), 1);
                this.allTasks.unfinished = this.allTasks.unfinished.slice();
            }
        }
    };

    startTask(task: any) {
        this.activeTomato = task;
        this.activeTomato.startTime = new Date();
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
        this.activeTomato.num += 1;
        if (status === true) {
            // 创建tomato
            this.activeTomato.endTime = new Date();
            let tomato: any = {
                userid: 'test',
                taskid: this.activeTomato._id,
                title: this.activeTomato.title,
                description: this.activeTomato.description,
                startTime: this.activeTomato.startTime,
                endTime: this.activeTomato.endTime,
                num: this.activeTomato.num,
                breakTime: 0
            }
            this.tomatoservice.CreateTomato(tomato).subscribe(data => {
            }, err => {
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
    }

    addTask = function (isActive: any) {
        let task = this.newTask;
        task.num = 1;
        task.isActive = isActive;
        // 创建任务
        this.taskservice.createTask(task).subscribe((data:any) => {
        });
        let tt = this.allTasks.unfinished;
        // replace push to trigger the event
        this.allTasks.unfinished = [task].concat(tt);
        this.newTask = {};
        this.openNewTaskForm = false;
    }

    removeTaskFromActiveList(task: any) {
        task.isActive = false;
        this.updateTask(task);
        this.allTasks.unfinished = this.allTasks.unfinished.slice();
    }

    addTaskToActiveList(task: any) {
        task.isActive = true;
        this.updateTask(task);
        this.allTasks.unfinished = this.allTasks.unfinished.slice();
    }

    updateTask(task: any) {
        this.taskservice.updateTask(task._id, task).subscribe(data => {
        }, err => {
            alert(JSON.stringify(err));
            console.log('updateTask err', err);
        });
    }
}