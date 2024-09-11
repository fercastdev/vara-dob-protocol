import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Userprof } from '../shared/interfaces/user';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserProfileService {
  

  baseUrl: string = 'assets/data/';

  constructor(private http: HttpClient) { }

  getUser(id:number): Observable<Userprof> {
    return this.http.get<Userprof[]>(this.baseUrl+'users.json')
    .pipe(
      map(users => {
          let user = users.filter((profile: Userprof)=> profile.id === id);
          return (user && user.length) ? user[0]:null;
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: any) {
    console.error('server error:', error);
    var err = new Error()

    if (error.error instanceof Error) {
        const errMessage = error.error.message;
        err = new Error(errMessage)
        return throwError(()=>errMessage);
        // return throwError(err.text() || 'backend server error');
    }
    return throwError(()=>new Error(error)|| 'Node.js server error');
  }
}
