import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";

export type InternalStateType = {
  [key: string]: any;
};

@Injectable()
export class AppState {
  _state: InternalStateType = {};
  _token: string;
  _userinfo: any;

  public subject: Subject<any> = new Subject<any>();
  public get userinfostate(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() {}

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
    this.subject.next(value)
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
