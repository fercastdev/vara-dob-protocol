import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsDetailComponent } from './notifications-detail.component';


const routes: Routes = [{ path: '', component: NotificationsDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NotificationsDetailRoutingModule { }