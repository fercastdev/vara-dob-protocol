import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoolDashboardComponent } from './pool-dashboard.component';

const routes: Routes = [{ path: ':id', component: PoolDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoolDashboardRoutingModule { }
