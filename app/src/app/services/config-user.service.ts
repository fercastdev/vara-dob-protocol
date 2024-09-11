import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { configUser } from '../shared/interfaces/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigUserService {

  baseUrl: string = 'assets/data/';

  constructor(private http: HttpClient) { }

  getUser(address:string): Observable<configUser> {
    return this.http.get<configUser[]>(this.baseUrl+'config-users.json')
    .pipe(
      map(users => {
          let user = users.filter((profile: configUser)=> profile.address === address);
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
    }
    return throwError(()=>new Error(error)|| 'Node.js server error');
  }
}
