import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SearchResult } from './search-result.model';
import { Tomato } from './tomato.model';
import { Cacheable } from 'rebirth-storage/dist/rebirth-storage';
import { RebirthHttp, RebirthHttpProvider, GET, POST, DELETE, Query, Path, Body } from 'rebirth-http/rebirth-http';



export abstract class TomatoService extends RebirthHttp {

  abstract CreateTomato(tomato: Tomato): Observable<any>;

  abstract getTomatos(pageIndex: any, pageSize: any, keyword?: string): Observable<SearchResult<Tomato>>;

  abstract getTomatoByTitle(tomatoTitle: string): Observable<Tomato>;

  abstract updateTomato(tomatoUrl: string, tomato: Tomato): Observable<any>;

  abstract deleteTomato(tomatoUrl: string): Observable<any>;
}


@Injectable()
export class OnlineTomatoService extends TomatoService {

  constructor(protected http: Http, protected rebirthHttpProvider: RebirthHttpProvider) {
    super();
  }

  @POST('http://localhost:3000/api/tomato')
  CreateTomato( @Body tomato: Tomato): Observable<any> {
    return null;
  }

  @Cacheable({ pool: 'tomatos' })
  @GET('http://localhost:3000/api/tomato')
  getTomatos( @Query('pageIndex') pageIndex = 1,
    @Query('pageSize') pageSize = 10,
    @Query('keyword') keyword?: string): Observable<SearchResult<Tomato>> {
    return null;
  }

  @GET('http://localhost:3000/api/tomato/:id')
  getTomatoByTitle( @Path('id') tomatoTitle: string): Observable<Tomato> {
    return null;
  }

  @POST('http://localhost:3000/api/tomato/:id')
  updateTomato( @Path('id') tomatoUrl: string, @Body tomato: Tomato): Observable<any> {
    return null;
  }

  @DELETE('http://localhost:3000/api/tomato/:id')
  deleteTomato( @Path('id') tomatoUrl: string): Observable<any> {
    return null;
  }

}

@Injectable()
export class GithubTomatoService extends TomatoService {

  constructor(protected http: Http, protected rebirthHttpProvider: RebirthHttpProvider) {
    super();
  }

  CreateTomato(tomato: Tomato): Observable<Tomato> {
    return null;
  }

  getTomatos(pageIndex = 1, pageSize = 10, keyword?: string): Observable<SearchResult<Tomato>> {
    return this.innerGetTomatos()
      .map(res => {
        const result = res.result || [];
        const startIndex = (pageIndex - 1) * pageSize;
        return {
          pageSize,
          pageIndex,
          total: result.length,
          result: result.slice(startIndex, startIndex + pageSize)
        };
      });
  }

  getTomatoByTitle(tomatoTitle: string): Observable<Tomato> {
    return this.innerGetTomatos()
      .map(res => {
        const result = res.result || [];
        return result.find(item => item.title === tomatoTitle);
      });
  }

  updateTomato(tomatoUrl: string, tomato: Tomato): Observable<any> {
    return null;
  }

  deleteTomato(tomatoUrl: string): Observable<any> {
    return null;
  }

  @Cacheable({ pool: 'tomatos' })
  @GET('tomatos.json')
  private innerGetTomatos(): Observable<SearchResult<Tomato>> {
    return null;
  }


}

export const TOMATO_SERVICE_PROVIDERS: Array<any> = [
  {
    provide: TomatoService,
    // environment.deploy === 'github' ? GithubTomatoService : OnlineTomatoService
    useClass: OnlineTomatoService
  }
];

