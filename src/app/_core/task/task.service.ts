import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Task } from './task.model';
import { SearchResult } from './search-result.model';
import { Observable } from 'rxjs/Observable';
import { Cacheable } from 'rebirth-storage/dist/rebirth-storage';
import { RebirthHttp, RebirthHttpProvider, GET, POST, DELETE, Query, Path, Body } from 'rebirth-http/rebirth-http';


export abstract class TaskService extends RebirthHttp {

  abstract getTasks(pageIndex:any, pageSize:any, keyword?: string): Observable<SearchResult<Task>>;

  abstract getTaskByTitle(taskTitle: string): Observable<Task>;

  abstract updateMarkdown(taskUrl: string, task: Task): Observable<any> ;

  abstract  deleteTask(taskUrl: string): Observable<any> ;
}


@Injectable()
export class OnlineTaskService extends TaskService {

  constructor(protected http: Http, protected rebirthHttpProvider: RebirthHttpProvider) {
    super();
  }

  @Cacheable({ pool: 'tasks' })
  @GET('http://localhost:3000/api/task')
  getTasks(@Query('pageIndex') pageIndex = 1,
              @Query('pageSize') pageSize = 10,
              @Query('keyword') keyword?: string): Observable<SearchResult<Task>> {
    return null;
  }

  @GET('task/:id')
  getTaskByTitle(@Path('id') taskTitle: string): Observable<Task> {
    return null;
  }

  @POST('task/:id')
  updateMarkdown(@Path('id') taskUrl: string, @Body task: Task): Observable<any> {
    return null;
  }

  @DELETE('task/:id')
  deleteTask(@Path('id') taskUrl: string): Observable<any> {
    return null;
  }

}

export const TASK_SERVICE_PROVIDERS: Array<any> = [
  {
    provide: TaskService,
    // environment.deploy === 'github' ? GithubTaskService : OnlineTaskService
    useClass: OnlineTaskService 
  }
];

