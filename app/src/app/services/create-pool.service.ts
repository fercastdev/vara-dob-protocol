import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { formPool } from '../shared/interfaces/formpool';

@Injectable({
  providedIn: 'root'
})
export class CreatePoolService {
  
  baseUrl: string = 'assets/data/';

  constructor(private http: HttpClient) { }

  getDraft(id:string): Observable<formPool> {
    return this.http.get<formPool[]>(this.baseUrl+'draft.json')
    .pipe(
      map(pools => {
          let pool = pools.filter((pool: formPool)=> pool.address === id);
          return (pool && pool.length) ? pool[0]:null;
      }),
      catchError(this.handleError)
    )
  }

  getDrafts(){
    console.log("getDrafts Service");
    return this.http.get<any>(this.baseUrl+'draft.json')
  }

  private handleError(error: any) {
    console.error('server error:', error);
    var err = new Error()

    if (error.error instanceof Error) {
        const errMessage = error.error.message;
        err = new Error(errMessage)
        return throwError(()=>errMessage);
        // Use the following instead if using lite-server
        // return throwError(err.text() || 'backend server error');
    }
    return throwError(()=>new Error(error)|| 'Node.js server error');
  }
}
