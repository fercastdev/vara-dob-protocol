import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BackButtonComponent } from "../back-button/back-button.component";
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { ChartsModule } from 'ng2-charts';
import { IndicatorCardComponent } from './indicator-card/indicator-card.component';
import { SharedModule } from 'app/shared/shared.module';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LineMobileChartComponent } from './line-mobile-chart/line-mobile-chart.component';



@NgModule({
  declarations: [
    BackButtonComponent,
    DonutChartComponent,
    IndicatorCardComponent,
    LineChartComponent,
    LineMobileChartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule,
    SharedModule
  ],
  exports: [
    BackButtonComponent,
    DonutChartComponent,
    IndicatorCardComponent,
    LineMobileChartComponent,
    LineChartComponent
  ],
})
export class CustomCommonModulesModule { }
