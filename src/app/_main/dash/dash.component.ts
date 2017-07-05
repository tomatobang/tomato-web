import { Component, ViewChild,OnInit } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AngularRoundProgressComponent } from '../../_directives/angular-round-progress-directive';
import { ActivatedRoute } from '@angular/router';

import { OnlineTaskService } from '../../_core/task/index';
import { OnlineTomatoService } from '../../_core/tomato/index';
// import { OnlineUserService } from '../../_core/user/index';

import { AppState } from '../../app.service';
import { Subscription } from 'rxjs';


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

export class DashComponent{
    @ViewChild('myModal')
    modal: ModalComponent;

    @ViewChild('breakModal')
    breakModal: ModalComponent;


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

    // 番茄钟长度
    countdown: number = 25;
    // 休息时间长度
    resttime: number = 5;
    isResting: boolean = false;
    mytimeout: any = null;
    resttimeout: any = null;
    resttimestart: any = null;
    // 连续任务个数
    tomatoCount: number = 0;
    historyTomatoes: Array<any> = [];//{title:'测试',endTime:new Date()}

    config = {
        desktopNotification: true
    };
    openNewTaskForm = false;
    allTasks = {
        finished: new Array,
        unfinished: new Array
    };

    newTask = {
        title: '',
        description: '',
        num: 1
    };
    activeTomato: any = null;
    breakReason = "";
    showTomatoNoti = false;
    NotiMessage = "";

    timerStatus = {
        label: this.countdown + ':00',
        countdown: this.countdown,
        percentage: 0,
        count: 0,
        reset: function () {
            this.count = 0;
            this.percentage = 0;
            this.label = this.countdown + ":00";
        }
    };

    constructor(public taskservice: OnlineTaskService, public tomatoservice: OnlineTomatoService,
        public activeRoute: ActivatedRoute, public globalservice: AppState) {//, public userservice: OnlineUserService
    }

    userinfostateSubscription:Subscription;
    ngOnInit() {
        this.activeRoute.params.subscribe(
            params => {
                //
            }
        );
        this.countdown = this.globalservice.countdown;
        this.resttime = this.globalservice.resttime;
        if(this.userinfostateSubscription){
            this.userinfostateSubscription.unsubscribe();
        }
        // TODO:修复加载两次的 BUG
        this.userinfostateSubscription =this.globalservice.userinfostate.subscribe(data => {
             this.loadTasks();
        });
        this.timerStatus.countdown = this.countdown;
        this.timerStatus.reset();
        

        this.mp3Source.setAttribute('src', '/assets/audios/alert.mp3');
        this.oggSource.setAttribute('src', '/assets/audios/alert.ogg');
        this.alertAudio.appendChild(this.mp3Source);
        this.alertAudio.appendChild(this.oggSource);
        this.alertAudio.load();

        this.tomatoservice.getTodayTomatos().subscribe(data =>{
            let list = JSON.parse(data._body);
            this.historyTomatoes = list;
            this.tomatoCount = list.length;
        })

        this.loadTasks();
        
    }

    loadTasks(){
        this.taskservice.getTasks().subscribe(data => {
            const retStr = data && data._body;
            const dataArr = JSON.parse(retStr);
            this.allTasks.unfinished = dataArr;
            if(dataArr.length > 0 && this.allTasks.unfinished){
                this.allTasks.unfinished = this.allTasks.unfinished.slice();
            }else{
                this.allTasks.unfinished = [];
                this.allTasks.unfinished = this.allTasks.unfinished.slice();
            } 
        }, err => {
            alert(JSON.stringify(err));
            console.log('getTasks err', err);
        })
    }

    ngOnDestroy(){
        clearInterval(this.notiIntervalID);
    }

    getTimes(n: any) {
        return new Array(n);
    };

    breakActiveTask() {
        this.stopTimer();
        this.breakModal.open();
        if (Piecon) {
            Piecon.reset();
        }

    }

    startTimer() {
        this.isResting = false;
        if (typeof this.mytimeout !== "undefined") {
            clearTimeout(this.mytimeout);
            this.timerStatus.reset();
        }
        this.mytimeout = setTimeout(this.onTimeout.bind(this), 1000);
    };


    startRestTimer() {
        this.resttimestart = new Date();
        if (typeof this.resttimeout !== "undefined") {
            clearTimeout(this.resttimeout);
            this.timerStatus.reset();
        }
        this.isResting = true;
        this.resttimeout = setTimeout(this.onRestTimeout.bind(this), 1000);
    };

    onTimeout() {
        // 重构
        let datenow: number = new Date().getTime();
        let startTime: number = this.activeTomato.startTime.getTime();
        let dataspan: number = datenow - startTime;

        let secondspan: number = dataspan / 1000;
        let percentage = dataspan / (this.countdown * 60 * 1000);

        this.timerStatus.percentage = percentage;
        this.timerStatus.label = this.secondsToMMSS(this.countdown * 60 - parseInt(secondspan + ''));

        if (dataspan >= this.countdown * 60 * 1000) {
            this.askForFinishStatus();
            this.alertAudio.play();
            if (this.config.desktopNotification) {
                this.showDesktopNotification();
            }
        } else {
            this.mytimeout = setTimeout(this.onTimeout.bind(this), 1000);
        }

        Piecon.setProgress(Math.floor(this.timerStatus.percentage * 100));

        // this.timerStatus.count++;
        // this.timerStatus.percentage = this.timerStatus.count / (this.countdown * 60);
        // this.timerStatus.label = this.secondsToMMSS(this.countdown * 60 - this.timerStatus.count);
        // if (this.timerStatus.percentage >= 1) {
        //     this.askForFinishStatus();
        //     this.alertAudio.play();
        //     if (this.config.desktopNotification) {
        //         this.showDesktopNotification();
        //     }
        // }
        // else {
        //     this.mytimeout = setTimeout(this.onTimeout.bind(this), 1000);
        // }
        // Piecon.setProgress(Math.floor(this.timerStatus.percentage * 100));
    };

    onRestTimeout() {
        let datenow: number = new Date().getTime();
        let startTime: number = this.resttimestart.getTime();
        let dataspan: number = datenow - startTime;

        let secondspan: number = dataspan / 1000;
        let percentage = dataspan / (this.resttime * 60 * 1000);

        this.timerStatus.percentage = percentage;
        this.timerStatus.label = this.secondsToMMSS(this.resttime * 60 - parseInt(secondspan + ''));

        if (dataspan >= this.resttime * 60 * 1000) {
            this.alertAudio.play();
            if (this.config.desktopNotification) {
                this.showDesktopNotification_restend();
            }
            this.isResting = false;
            this.timerStatus.reset();
            Piecon.reset();
        } else {
            this.resttimeout = setTimeout(this.onRestTimeout.bind(this), 1000);
        }

        Piecon.setProgress(Math.floor(this.timerStatus.percentage * 100));
    }

    stopTimer() {
        clearTimeout(this.mytimeout);
        this.timerStatus.reset();
    };

    removeTask(task: any) {
        for (let index in this.allTasks.unfinished) {
            if (this.allTasks.unfinished[index] === task) {
                let ind = new Number(index);
                // 删除任务
                this.taskservice.deleteTask(task._id).subscribe(response => {
                    let data: any = JSON.parse(response._body);
                    if (data && data.status == "fail") {
                    } else {
                        this.allTasks.unfinished.splice(ind.valueOf(), 1);
                        this.allTasks.unfinished = this.allTasks.unfinished.slice();
                    }
                });

            }
        }
    };

    notiIntervalID: any = 0;
    startTask(task: any) {
        this.activeTomato = task;
        this.activeTomato.startTime = new Date();
        this.startTimer();
        this.showTomatoNoti = true;
        this.NotiMessage = "新的番茄钟开启了，专注专注再专注！！!";
        let that = this;
        clearInterval(this.notiIntervalID)
        this.notiIntervalID = setInterval(function () {
            that.showTomatoNoti = false;
            that.NotiMessage = "";
        }, 3000);
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

    showDesktopNotification_restend() {
        if (chrome) {
            new Notification("休息结束，可以开启另一个番茄钟了!", { icon: "./assets/image/notification-icon.jpg" });
        }
        else {
            Notification.requestPermission(function (permission: any) {
                if (permission == 'granted') {
                    new Notification("休息结束，可以开启另一个番茄钟了!", { icon: "./assets/image/notification-icon.jpg" });
                }
            });
        }
    }

    closeBreakModal() {
        // 创建tomato
        let tomato: any = {
            userid: 'test',
            taskid: this.activeTomato._id,
            title: this.activeTomato.title,
            target: this.activeTomato.target,
            description: this.activeTomato.description,
            startTime: this.activeTomato.startTime,
            endTime: new Date(),
            num: this.activeTomato.num,
            breakTime: 1,
            succeed: 0,
            breakReason: this.breakReason
        }
        this.historyTomatoes.push(Object.assign({}, tomato));
        this.tomatoservice.CreateTomato(tomato).subscribe(response => {
            let data: any = JSON.parse(response._body);
            if (data && data.status == "fail") {
            } else {
                for (var index = 0; index < this.allTasks.unfinished.length; index++) {
                    var element = this.allTasks.unfinished[index];
                    if (element.title == this.activeTomato.title && element.isActive == true) {
                        element.isActive = false;
                        this.allTasks.unfinished = this.allTasks.unfinished.slice();
                        break;
                    }
                }
                this.activeTomato = null;
                this.breakModal.close();
                this.startRestTimer();
            }
        }, err => {
            alert(JSON.stringify(err));
            console.log('CreateTomato err', err);
            this.activeTomato = null;
        });

    }

    close(status: any) {
        if (status === true) {
            // 创建tomato
            this.activeTomato.endTime = new Date();
            let tomato: any = {
                userid: 'test',
                taskid: this.activeTomato._id,
                title: this.activeTomato.title,
                target: this.activeTomato.target,
                description: this.activeTomato.description,
                startTime: this.activeTomato.startTime,
                endTime: this.activeTomato.endTime,
                num: this.activeTomato.num,
                breakTime: 0,
                succeed: 1,
                breakReason: ''
            }
            this.historyTomatoes.push(Object.assign({}, tomato));
            this.tomatoservice.CreateTomato(tomato).subscribe(response => {
                let data: any = JSON.parse(response._body);
                if (data && data.status == "fail") {
                } else {
                    this.allTasks.finished.push(this.activeTomato);
                    this.startRestTimer();
                    this.tomatoCount += 1;
                }
            }, err => {
                alert(JSON.stringify(err));
                console.log('CreateTomato err', err);
            });

            // 删除任务
            // this.removeTask(this.activeTomato);
        }
        this.timerStatus.reset();
        this.activeTomato = null;
        this.modal.close();
        Piecon.reset();
    }

    addTask = function (isActive: any) {
        let task = this.newTask;
        // task.num = 1;
        task.isActive = isActive;
        // 创建任务
        this.taskservice.createTask(task).subscribe((response: any) => {
            let data: any = JSON.parse(response._body);
            if (data && data.status == "fail") {
            } else {
                let tt = this.allTasks.unfinished;
                // replace push to trigger the event
                this.allTasks.unfinished = [task].concat(tt);
                this.newTask = {
                    title: '',
                    description: '',
                    num: 1
                };
                this.openNewTaskForm = false;
            }
        });

    }

    removeTaskFromActiveList(task: any) {
        task.isActive = false;
        this.taskservice.updateTask(task._id, task).subscribe(response => {
            let data: any = JSON.parse(response._body);
            if (data && data.status == "fail") {
            } else {
                this.allTasks.unfinished = this.allTasks.unfinished.slice();
            }
        }, err => {
            alert(JSON.stringify(err));
            console.log('updateTask err', err);
        });

    }

    addTaskToActiveList(task: any) {
        task.isActive = true;
        this.taskservice.updateTask(task._id, task).subscribe(response => {
            let data: any = JSON.parse(response._body);
            if (data && data.status == "fail") {
            } else {
                this.allTasks.unfinished = this.allTasks.unfinished.slice();
            }
        }, err => {
            alert(JSON.stringify(err));
            console.log('updateTask err', err);
        });

    }

    closeTomatoNoti() {
        this.showTomatoNoti = false;
        this.NotiMessage = "";
    }
}