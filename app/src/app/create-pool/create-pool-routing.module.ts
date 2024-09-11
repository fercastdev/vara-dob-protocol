import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePoolComponent } from './create-pool.component';

const routes: Routes = [{ path: '', component: CreatePoolComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePoolRoutingModule { }
