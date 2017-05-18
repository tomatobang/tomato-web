import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user.model';
import { SearchResult } from './search-result.model';
import { Observable } from 'rxjs/Observable';
import { Cacheable } from 'rebirth-storage/dist/rebirth-storage';
import { RebirthHttp, RebirthHttpProvider, GET, POST, DELETE, Query, Path, Body } from 'rebirth-http/rebirth-http';


export abstract class UserService extends RebirthHttp {

  abstract getUsers(pageIndex:any, pageSize:any, keyword?: string): Observable<SearchResult<User>>;

  abstract getUserByTitle(userName: string): Observable<User>;

  abstract updateUser(userUrl: string, user: User): Observable<any> ;

  abstract  deleteUser(userUrl: string): Observable<any> ;
}


@Injectable()
export class OnlineUserService extends UserService {

  constructor(protected http: Http, protected rebirthHttpProvider: RebirthHttpProvider) {
    super();
  }

  @Cacheable({ pool: 'users' })
  @GET('http://115.29.51.196:5555/api/user')
  getUsers(@Query('pageIndex') pageIndex = 1,
              @Query('pageSize') pageSize = 10,
              @Query('keyword') keyword?: string): Observable<SearchResult<User>> {
    return null;
  }

  @GET('http://115.29.51.196:5555/api/user/:id')
  getUserByTitle(@Path('id') userName: string): Observable<User> {
    return null;
  }

  @POST('http://115.29.51.196:5555/api/user/:id')
  updateUser(@Path('id') userUrl: string, @Body user: User): Observable<any> {
    return null;
  }

  @DELETE('http://115.29.51.196:5555/api/user/:id')
  deleteUser(@Path('id') userUrl: string): Observable<any> {
    return null;
  }

}

@Injectable()
export class GithubUserService extends UserService {

  constructor(protected http: Http, protected rebirthHttpProvider: RebirthHttpProvider) {
    super();
  }

  getUsers(pageIndex = 1, pageSize = 10, keyword?: string): Observable<SearchResult<User>> {
    return this.innerGetUsers()
      .map(res => {
        const result = res.result || [];
        const startIndex = (pageIndex - 1 ) * pageSize;
        return {
          pageSize,
          pageIndex,
          total: result.length,
          result: result.slice(startIndex, startIndex + pageSize)
        };
      });
  }

  getUserByTitle(userName: string): Observable<User> {
    return this.innerGetUsers()
      .map(res => {
        const result = res.result || [];
        return result.find((item:User) => item.username === userName);
      });
  }

  updateUser(userUrl: string, user: User): Observable<any> {
    return null;
  }

  deleteUser(userUrl: string): Observable<any> {
    return null;
  }

  @Cacheable({ pool: 'users' })
  @GET('users.json')
  private  innerGetUsers(): Observable<SearchResult<User>> {
    return null;
  }


}

export const USER_SERVICE_PROVIDERS: Array<any> = [
  {
    provide: UserService,
    // environment.deploy === 'github' ? GithubUserService : OnlineUserService
    useClass: OnlineUserService 
  }
];

