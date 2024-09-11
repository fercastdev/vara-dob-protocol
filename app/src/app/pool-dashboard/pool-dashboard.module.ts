import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolDashboardComponent } from './pool-dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PoolDashboardRoutingModule } from './pool-dashboard-routing.module';
import { CustomCommonModulesModule } from 'app/custom-common-modules/custom-common-modules.module';
import { MatTableModule } from '@angular/material/table'; 
//import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { DepositDialogComponent } from './deposit-dialog/deposit-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu'; 




@NgModule({
  declarations: [PoolDashboardComponent, DepositDialogComponent],
  imports: [
    CommonModule,
    NgxChartsModule,
    PoolDashboardRoutingModule,
    CustomCommonModulesModule,
    MatTableModule,
    //MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatMenuModule
  ]
})
export class PoolDashboardModule { }
