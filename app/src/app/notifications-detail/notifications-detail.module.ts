import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsDetailComponent } from './notifications-detail.component';
import { NotificationsDetailRoutingModule } from './notifications-detail-routing.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 

@NgModule({
  declarations: [NotificationsDetailComponent],
  imports: [
    CommonModule,
    NotificationsDetailRoutingModule,
    MatButtonToggleModule
  ]
})
export class NotificationsDetailModule { }




