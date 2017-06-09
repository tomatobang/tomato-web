import { Component } from '@angular/core';
import { RebirthHttpProvider } from 'rebirth-http';
import { AppState } from './app.service';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';

@Component({
  selector: 'my-app',
  templateUrl: "./app.component.html",
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent {
  name = 'TOMATOBANG';
  constructor(rebirthHttpProvider: RebirthHttpProvider, appstate: AppState) {
    // setup jwt token
    if (appstate.token) {
      rebirthHttpProvider.headers({ Authorization: appstate.token });
    }

    // setup unauthorization response error interceptor
    rebirthHttpProvider.addResponseErrorInterceptor((err: Response) => {
      if (err.status === 401 && (err.url.indexOf('/api/login') === -1)) {
        return Observable.empty();
      }

      return Observable.throw(err);
    });

    rebirthHttpProvider
          .addInterceptor({
            request: request => {
              console.log('Global interceptors(request)', request);
            },
            response: (stream) => stream.map(response => {
              let data:any = JSON.parse(response._body);
              if(data && data.status == "fail"){
                alert("请求失败！请先登录");
              }
              return response;
            })
          });
  }
}
