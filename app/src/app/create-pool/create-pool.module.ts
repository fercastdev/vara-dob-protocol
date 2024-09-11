import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePoolComponent } from './create-pool.component';
import { CreatePoolRoutingModule } from './create-pool-routing.module';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import { NguCarouselModule } from '@ngu/carousel';
import { ContractCarouselComponent } from './contract-carousel/contract-carousel.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PoolSimulationComponent } from './pool-simulation/pool-simulation.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { OtherOptionDialogComponent } from './other-option-dialog/other-option-dialog.component';
import { ConfirmationFormComponent } from './confirmation-form/confirmation-form.component';
import { PercentDialogComponent } from './percent-dialog/percent-dialog.component';
import { MatListModule } from '@angular/material/list';
import { CustomCommonModulesModule } from 'app/custom-common-modules/custom-common-modules.module';



@NgModule({
  declarations: [CreatePoolComponent, ContractCarouselComponent, PoolSimulationComponent, OtherOptionDialogComponent, ConfirmationFormComponent, PercentDialogComponent],
  imports: [
    CommonModule,
    CreatePoolRoutingModule,
    FormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    NguCarouselModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxChartsModule,
    MatDialogModule,
    MatListModule,
    CustomCommonModulesModule
  ],
})
export class CreatePoolModule { }
