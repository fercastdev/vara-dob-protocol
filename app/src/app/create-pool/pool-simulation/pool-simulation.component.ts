import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as shape from 'd3-shape';
import * as dateFns from "date-fns";

@Component({
  selector: 'app-pool-simulation',
  templateUrl: './pool-simulation.component.html',
  styleUrls: ['./pool-simulation.component.scss']
})

//Pool simulation component, simulation of withdraws and transferences of the pool. Inlcudes an initial amount from which the volume is retreat 

export class PoolSimulationComponent implements OnInit {
  //peridiocity options for the user to simulate transfer
  @Input() peridiocityOptions: string[];

  //Discount percent to simulate periodic withdraws
  @Input() discountPercent: any;

  //Distribution dates received from parent  
  @Input() withdrawDates: Date[];

  //validity dexpiration date
  @Input() lastDate: Date;

  @Input() optionPeridiocity: Number[];

  @Input() peridiocityValue: any;

  //Considering the case with different distribution dates
  @Input() individualPercent: number=0;
  transferDates: Date[] = [];
  actualAmount:number=0;
  simulation: FormGroup;
  today: Date = new Date();
  private _selected : string;
  public data: object ={
    "data":[],
    "labels":[]
  };

  get selected (){
    return this._selected
  }

  set selected(val : string ){
    this._selected=val
  }

  curve = shape.curveCatmullRom;

  setTransferDates(){
    this.transferDates = []
    let periodAmount = this.simulation.value.peridiocity.split(",")[1]
    let periodUnit = this.simulation.value.peridiocity.split(",")[0]
    
    
    let nextDate : Date = this.nextDistFunc(periodUnit, periodAmount, this.today)
    while (nextDate <= this.lastDate){
      this.transferDates.push(nextDate)
      nextDate = this.nextDistFunc(periodUnit, periodAmount, nextDate)
    }
    this.createData()
  }

  createData(){
    if(this.transferDates.length === 0){
      this.setTransferDates()
    }
    let tempData= {
        "data":[],
        "labels":[]
      };
    this.data=tempData
    tempData["data"].push(this.simulation.value.initialAmount)
    tempData["labels"].push(dateFns.format(dateFns.parseJSON(this.today), 'dd MMM yyy').toString())

    this.actualAmount=this.simulation.value.initialAmount
    let periodAmount = this.simulation.value.peridiocity.split(",")[1]

    
    let plindex = 0
    let mnindex = 0
    let pldate: Date = dateFns.min(this.transferDates); //---> fechas deposito plata
    let mndate: Date = dateFns.min(this.withdrawDates); // --> fechas saco plata
    while( dateFns.isValid(pldate) || dateFns.isValid(mndate)){

      if ( mndate <= pldate || !dateFns.isValid(pldate) ){
        this.actualAmount=this.actualAmount*(1-this.discountPercent)
        tempData["data"].push(this.actualAmount)
        tempData["labels"].push(dateFns.format(dateFns.parseJSON(mndate), 'dd MMM yyy').toString())

        mnindex+=1
      } else if (periodAmount != 0) {
        this.actualAmount+=this.simulation.value.periodicAmount
        tempData["data"].push(this.actualAmount)
        tempData["labels"].push(dateFns.format(dateFns.parseJSON(pldate), 'dd MMM yyy').toString())
        plindex+=1
      }
      pldate = dateFns.min(this.transferDates.slice(plindex,this.transferDates.length))
      mndate = dateFns.min(this.withdrawDates.slice(mnindex,this.withdrawDates.length))
    }

    if (this.actualAmount != 0){
      tempData["data"].push(0)
      tempData["labels"].push(dateFns.format(dateFns.parseJSON(this.lastDate), 'dd MMM yyy').toString())
      this.actualAmount=0
    }
    this.data=tempData
    tempData={
      "data":[],
      "labels":[]
    };
  }

  onChange(): void {
    this.simulation.valueChanges.subscribe(val => {
      if(this.simulation.valid){7
        this.setTransferDates()
      }
    })
  }

  nextDistFunc (periodUnit, periodAmount, firstDate){
    let nextDate : Date
    switch(periodUnit){
      case "years":
        nextDate = dateFns.add(firstDate,{ years : periodAmount })
        break;
      case "months":
        nextDate = dateFns.add(firstDate,{ months : periodAmount })
        break;
      case "days":
        nextDate = dateFns.add(firstDate,{ days : periodAmount })
        break;
    }
    return nextDate
  }

  constructor(private _formBuilder: FormBuilder) { 
  }
  
  ngOnInit(): void {
    this.simulation = this._formBuilder.group({
      initialAmount: [10000, Validators.required],
      periodicAmount: [1000, Validators.required],
      peridiocity: [this.peridiocityValue, Validators.required],
    });
    this.setTransferDates()
    this.onChange()
  }

}
