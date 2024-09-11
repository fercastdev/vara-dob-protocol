import { Component, Input, OnInit, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISmartContractData } from '../smart-contract-data';

@Component({
  selector: 'app-confirmation-form',
  templateUrl: './confirmation-form.component.html',
  styleUrls: ['./confirmation-form.component.scss', '../create-pool.component.scss']
})

//Confirmation form component, form disabled with which the user visualize and can edit the data provide for creating a smart contract. 

export class ConfirmationFormComponent implements OnInit {
  private _data= {} as ISmartContractData;
  @Input() BCTypeOptions: string[];
  @Input() tokenTypeOptions: string[];
  @Input() peridiocityOptions: object;
  @Input() timezones: any[];
  @Input() validityUnitOptions: string[];
  @Input() contractType:any;
  @Output() goToStep: EventEmitter<any> = new EventEmitter<any>();
  otherPeriodOption: boolean = false;
  confirmationForm: FormGroup;
  sameDistr: number;

  get data (){
    return this._data
  }

  @Input() set data(val){
    console.log("me llego", val)
    this._data=val
    this.fillData()
  }

  constructor(private _formBuilder: FormBuilder) { 
    this.confirmationForm = this._formBuilder.group({
      name: ['', Validators.required],
      BCType: ['', Validators.required],
      tokenType: ['', Validators.required],
      maxNumberToken: ['', Validators.required],
      poolAccess: ['', Validators.required],
      maxNumPeople: ['', Validators.required],
      distributionWay: ['', Validators.required],
      disitributionRatio: [[], Validators.required],
      validity: ['', Validators.required],
      validityUnit: ['', Validators.required],
      peridiocity: ['', Validators.required],
      firstDate: ['', Validators.required],
      timeZone: ['', Validators.required],
    });
   }

  editStep(step: number){
    this.goToStep.emit(step)
  }

  fillData(){
    var params = Object.keys(this.confirmationForm.controls)
    for( let p of params){
      this.confirmationForm.get(p).setValue(this.data[p])
    }
    if((Object.keys(this.data)).find(element => element === "sameDistr")){
      if(this.data['sameDistr'] !== 0){
        console.log('foundIt')
        this.sameDistr = this.data['sameDistr']
      }

    }
  }

  ngOnInit(): void {
    this.data
    this.confirmationForm.disable();
    console.log('this contract', this.contractType)
  }

  ngOnDestroy(){
    console.log('destroying')
  }

  ngOnchanges(changes: SimpleChanges){
    console.log('changes', changes)
  }
  
}
