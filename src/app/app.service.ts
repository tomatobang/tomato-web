import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";

export type InternalStateType = {
  [key: string]: any;
};

let subject: Subject<any> = new Subject<any>();
let settingSubject: Subject<any> = new Subject<any>();
@Injectable()
export class AppState {
  _state: InternalStateType = {};
  _token: string;
  _userinfo: any;
  _countdown: number = 0;
  _resttime: number = 0;

  public get userinfostate(): Observable<any> {
    return subject.asObservable();
  }

  public get settingState(): Observable<any> {
    return settingSubject.asObservable();
  }

  constructor() { }

  get countdown() {

    if (this._countdown != 0) {
      return this._countdown;
    } else {
      let countdownStr = localStorage.getItem("_countdown");
      if (countdownStr) {
        return parseInt(countdownStr);
      } else {
        return 25;
      }
    }
  }

  set countdown(value: number) {
    this._countdown = value;
      debugger;
    localStorage.setItem("_countdown", value + "");
    settingSubject.next({
      countdown: this._countdown,
      resttime: this._resttime
    })
  }


  get resttime() {
    if (this._resttime != 0) {
      return this._resttime;
    } else {
      let restStr = localStorage.getItem("_resttime");
      if (restStr) {
        return parseInt(restStr);
      } else {
        return 5;
      }
    }
  }

  set resttime(value: number) {
    this._resttime = value;
    localStorage.setItem("_resttime", value + "");
    settingSubject.next({
      countdown: this._countdown,
      resttime: this._resttime
    })
  }


  get backendUrl() {
    // http://localhost:5555/
    return " http://115.29.51.196:5555/";
  }

  // already return a clone of the current state
  get state() {
    return (this._state = this._clone(this._state));
  }
  // never allow mutation
  set state(value) {
    throw new Error("do not mutate the `.state` directly");
  }

  get userinfo() {
    if (this._userinfo) {
      return this._userinfo;
    } else {
      var userStr = localStorage.getItem("userinfo");
      if (userStr) {
        try {
          this._userinfo = JSON.parse(userStr);
          return this._userinfo;
        } catch (error) {
          return null;
        }
      } else {
        return null;
      }
    }
  }

  set userinfo(value) {
    this._token = value;
    localStorage.setItem("userinfo", value);
    subject.next(value)
  }

  get token() {
    if (this._token) {
      return this._token;
    } else {
      return localStorage.getItem("token");
    }
  }
  set token(value) {
    this._token = value;
    localStorage.setItem("token", value);
  }

  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop)
      ? state[prop]
      : localStorage.getItem(prop) ? localStorage.getItem(prop) : "";
  }

  set(prop: string, value: any) {
    // internally mutate our state
    localStorage.setItem(prop, value);
    return (this._state[prop] = value);
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }
}
