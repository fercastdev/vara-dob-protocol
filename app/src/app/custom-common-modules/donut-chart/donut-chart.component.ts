import { AfterViewInit, Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {
  @ViewChild(BaseChartDirective, { static: true })
  chartElem: BaseChartDirective;
  @Input() public title: string = 'default';
  @Input() public mainValue: number;
  @Input() public diffValue: string = 'default';
  @Input() public poolId: any;
  @Input() public showIcon: boolean;

  private _rawChartData: number[];

  get rawChartData(){
    return this._rawChartData
  }

  @Input() set rawChartData(val:number[]){
    this._rawChartData=val
    this.prepareChartData()
  }

  private _currency: string;

  @Input() get currency (){
    return this._currency
  }

  set currency (val){
    this._currency = val
  }

  public doughnutChartData: number[];
  public doughnutChartType = 'doughnut';
  public doughnutChartColors: Color[] = [{
    backgroundColor: ['#9A99FF', '#FCAD57', '#FCCC22', '#71EBCD', '#3E54D3']
   }];
  public doughnutChartOptions : ChartOptions = {
    responsive: true,
    cutoutPercentage: 83,
    animation: {
      onComplete: function (animation) {
        this.drawChart();
      }.bind(this),
    },
  };

  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [
    {
      beforeDraw(chart) {}
    }
  ];

  private _insideTitle: string = 'loading';
  
  @Input() get insideTitle(){
    return this._insideTitle
  }

  set insideTitle(val: string){
    this._insideTitle=val
  }

  private _insideSubTitle: string='loading'

  @Input() get insideSubTitle(){
    return this._insideSubTitle
  }

  set insideSubTitle(val: string){
    this._insideSubTitle=val
  }

  drawChart(){
    const chart = this.chartElem.chart ;
    const ctx = chart.ctx;
    const txt = 'Center Text';

    //Get options from the center object in options
    const sidePadding = 60;
    const sidePaddingCalculated = (sidePadding / 100) * (chart.height/2)

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
    const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

    //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
    const stringWidth = ctx.measureText(txt).width;
    const elementWidth = (chart.height/2) - sidePaddingCalculated;

    // Find out how much the font can grow in width.
    const widthRatio = elementWidth / stringWidth;
    const newFontSize = Math.floor(50 * widthRatio);
    const elementHeight = (chart.height/2);

    // Pick a new font size so it will not be larger than the height of label.
    const fontSizeToUse = Math.min(newFontSize, elementHeight);

    ctx.font = fontSizeToUse + 'px Arial';
    ctx.fillStyle = '#39393A';

    // Draw text in center
    if ( this.insideSubTitle.length!=0 ) {
      ctx.fillText(this.insideTitle, centerX, centerY-10);
      var fontSizeToUse1 = 15;
      ctx.font = fontSizeToUse1 + 'px Arial';
      ctx.fillStyle = '#9A99FF'
      ctx.fillText(this.insideSubTitle, centerX, centerY + 10);
    } else {
      ctx.fillText(this.insideTitle, centerX, centerY);
    }


    chart.update()
  }


  constructor() {
   }

  prepareChartData(){
    var auxData = this.rawChartData
    var initialValue = 0
    const reducer = (sum, val) => sum + val;
    if (auxData.length > 5){
      var others = auxData.slice(4, auxData.length).reduce(reducer, initialValue)
      this.doughnutChartData = auxData.slice(0,4)
      this.doughnutChartData.push(others)
    } else {
      this.doughnutChartData=auxData
    }

  }

  ngOnInit() {
  }
}