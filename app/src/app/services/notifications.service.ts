import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  baseUrl: string = 'assets/data/';

  constructor(private http: HttpClient) { }

  getNotifications(){
    console.log("Notifications Service");
    return this.http.get<any>(this.baseUrl+'notifications.json')
  }
}
