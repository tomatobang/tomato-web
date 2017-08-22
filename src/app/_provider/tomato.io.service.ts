
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Socket } from "ng-socket-io";
import {Tomato} from "../_core/tomato"

@Injectable()
export class TomatoIOService {
	constructor(private socket: Socket) {}


	/**
	 * 第一次，用于加载当前tomato
	 */
	load_tomato(userid:String){
		this.socket.emit("load_tomato", {userid,endname:"ionic"},);
	}

	load_tomato_succeed(){
		return this.socket.fromEvent<any>("load_tomato_succeed").map(data => data);
	}

	/**
	 * 其它终端中断番茄钟
	 */
	other_end_break_tomato() {
		return this.socket.fromEvent<any>("other_end_break_tomato").map(data => data);
	}
	/**
	 * 中断番茄钟
	 */
	break_tomato(userid:String,tomato:Tomato) {
		this.socket.emit("break_tomato",{
			userid,tomato
		} );
	}

	/**
	 * 中断番茄钟
	 */
	break_tomato_succeed() {
		this.socket.fromEvent<any>("break_tomato_succeed").map(data => data);
	}

	/**
	 * 其它终端开启番茄钟
	 */
	other_end_start_tomato() {
		return this.socket.fromEvent<any>("other_end_start_tomato").map(data => data);
	}

	/**
	 * 开启番茄钟
	 */
	start_tomato(userid:String,tomato:Tomato) {
		this.socket.emit("start_tomato", {userid,tomato});
	}

	/**
	 * 开启番茄钟
	 */
	start_tomato_succeed(tomato:Tomato) {
		this.socket.emit("start_tomato_succeed", tomato);
	}
}
