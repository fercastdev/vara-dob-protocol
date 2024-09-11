import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPoolsComponent } from './my-pools.component';

const routes: Routes = [{ path: '', component: MyPoolsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPoolsRoutingComponent { }