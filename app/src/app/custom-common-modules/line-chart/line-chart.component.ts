import { keyframes } from '@angular/animations';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
// import * as crosshair from 'chartjs-plugin-crosshair';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @ViewChild('myCanvas') canvas: ElementRef;
  @ViewChild(BaseChartDirective, { static: true })
  chartElem: BaseChartDirective;
  
  private _gotData: boolean =false;

  get gotData(){
    return this._gotData
  }

  set gotData(val){
    this._gotData=val
  }

  private _data: number[]

  get data (){
    return this._data
  }

  @Input() set data (val: number[]){
    this._data = val
    this.lineChartData  = [{data: this.data}]
  }

  private _labels: string[]

  get labels (){
    return this._labels
  }

  @Input() set labels ( val: string[]){
    this._labels = val
    if (this.data.length !== 0){
      this.gotData = true
    }
    this.lineChartLabels = this.labels
    //this.drawChart()
  }

  public canvasHeight: number = 50
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      intersect: false
    },
    legend: {
      position: 'bottom',
      display: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: 'rgba(0,0,0,0.5)',
            fontStyle: 'bold',
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 5
          },
          gridLines: {
            drawTicks: false,
            display: false,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            zeroLineColor: 'transparent',
            borderDash: [4,8],
            lineWidth: 2, 
            z:1,
          },
          ticks: {
            //padding: 20,
            fontColor: 'rgba(0,0,0,0.5)',
            fontStyle: 'bold',
            maxRotation: 90,
            minRotation: 45,  
          },
        },
      ],
    },
    animation: {
       onComplete: function (animation) {
         if(animation.initial){
           this.getVisibleValues(animation)
         }
       },
       duration: 0.0001
    },
    plugins:{
      tooltip: {
        animation: false
      },
      crosshair:{
        line:{
          color:'#000',
          width: 3
        }
      }
    },
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: "transparent",
      borderColor: '#C8D3F1',

    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { 
    this.lineChartData = [{data: this.data}];
    this.lineChartLabels = this.labels;
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.drawChart()
    //Event to activate the component
    window.scroll({ top: 1, left: 0 })
  }

  ngOnChanges(changes: SimpleChanges){
  }

  update(){
    const chart = this.chartElem.chart;
    console.log("update chart");
    chart.update()
  }

  drawChart(){
    console.log("activado drawchart");
    
    this.lineChartData = [{data: this.data}];
    this.lineChartLabels = this.labels;
    const chartElem = this.canvas.nativeElement.getContext('2d')
    const height = chartElem.canvas.offsetHeight
    const gradient = chartElem.createLinearGradient(0, 0, 0, height/1.5);
    gradient.addColorStop(0, '#e9eefb');
    gradient.addColorStop(.5, '#e9eefb');
    gradient.addColorStop(1, 'white');
    this.lineChartColors = [
        {
            backgroundColor: gradient,
            borderColor: '#597ce9',
        }
    ];
    this.update()
  }

  checkData(){
    if (this.lineChartData.length>0){
      this.gotData=true
    }
  }

  getVisibleValues(chart){
    console.log(chart.scales.x.ticks.map(el => ({
      value: el.value,
      label: el.label
    }))) // Map because stack console prints whole circular context which takes long time
  }

}
