import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared/shared.module';
import { MyPoolsRoutingComponent } from './my-pools-routing.module';
import { MyPoolsComponent } from './my-pools.component';
import { PoolItemComponent } from './pool-item/pool-item.component';
import { SortableDirective } from './sortable.directive';
import { FilterBoxComponent } from './filter-box.component';
import { CustomCommonModulesModule } from 'app/custom-common-modules/custom-common-modules.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 



@NgModule({
  declarations: [MyPoolsComponent, PoolItemComponent, SortableDirective, FilterBoxComponent],
  imports: [
    CommonModule,
    MyPoolsRoutingComponent,
    SharedModule,
    FormsModule,
    CustomCommonModulesModule,
    MatButtonToggleModule,
  ]
})
export class MyPoolsModule { }
