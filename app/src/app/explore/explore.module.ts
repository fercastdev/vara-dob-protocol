import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import { ExploreRoutingModule } from './explore-routing.module';

import { CustomCommonModulesModule } from 'app/custom-common-modules/custom-common-modules.module';
import { SharedModule } from '../shared/shared.module';
import { FilterBoxExpComponent } from './filter-box-exp.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ExploreComponent, FilterBoxExpComponent],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    SharedModule,
    CustomCommonModulesModule,
    FormsModule
  ]
})
export class ExploreModule { }
