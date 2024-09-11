import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-notifications-detail',
  templateUrl: './notifications-detail.component.html',
  styleUrls: ['./notifications-detail.component.scss']
})
export class NotificationsDetailComponent implements OnInit {

  constructor(private notification:NotificationsService) {
    this.getNotifications()
  }

  listNotifications: any;
  invNotifications: any = [];
  distNotifications: any = [];
  toggle=1;

  ngOnInit(): void {
  }

  async getNotifications(){
    await this.notification.getNotifications().subscribe((data) => {
      this.listNotifications = data
      this.getInvitations(this.listNotifications.length)
    })
  }

  getInvitations(length){
    for(let i=0; i<length; i++){
      if(this.listNotifications[i].type=="invitation"){
        this.invNotifications.push(this.listNotifications[i])
      }else{
        this.distNotifications.push(this.listNotifications[i])
      }
    }
    console.log("inv", this.invNotifications);
    console.log("dist", this.distNotifications);
  }

  getType(item: string){
    return item
  }

  onClick(number: number){
    this.toggle=number;
  }

}
