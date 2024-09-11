import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserDistr } from '../smart-contract-data';


@Component({
  selector: 'app-percent-dialog',
  templateUrl: './percent-dialog.component.html',
  styleUrls: ['./percent-dialog.component.scss','../create-pool.component.scss']
})

//Percent dialog component, angular material dialog to include different addresses to a pool with different distribution percent each.

export class PercentDialogComponent implements OnInit {
  user={} as IUserDistr
  message: string = ""
  confirmButtonText = "Ok"
  cancelButtonText = "Cancel"
  errorMessage = ""
  private _participants: IUserDistr[] = [];
  public filteredParticipants: IUserDistr[] = [];
  public contacts: IUserDistr[] = [];
  public index = 0;
  private _inputAddress: string;
  public validAddress: boolean;
  public invalidPercent: boolean
  private _totalSum: number = 0;

  get participants (){
    return this._participants
  }

  set participants(val){
    this._participants=val
    this.calculateTotal()
  }

  get inputAddress (){
    return this._inputAddress
  }

  set inputAddress(val: string){
    this._inputAddress=val
    this.validAddress=this.checkValid(val)
  }

  get totalSum(){
    return this._totalSum
  }

  set totalSum(val:number){
    this._totalSum=val
  }

  addContact(address: string){
    let user = {} as IUserDistr
    user.address=address
    user.percent=0
    this.contacts.push(user)
  }

  addParticipant(address: string){
    let participation: boolean = false
    for(let participant of this.participants){
      if(address===participant.address){
        participation=true
      }
    }
    if(!participation){
      let user = {} as IUserDistr
      user.address=address
      user.percent=0
      this.filteredParticipants.push(user)
      this.participants=this.filteredParticipants
    }
    this.inputAddress=''
  }

  calculateTotal(){
    let total = 0
    total += this.user.percent
    for (let participant of this.participants ){
      total+=participant.percent
    }
    this.totalSum=total
    if (this.totalSum > 100 ){
      this.message="Invalid percent distribution: Cannot be less or equal to 0 or more than 100"
      this.invalidPercent=true

    } else {
      this.message=""
      this.invalidPercent=false
    }
  }

  removeParticipant(index: number){
    this.filteredParticipants.splice(index,1)
    this.participants=this.filteredParticipants
  }  

  constructor(    
    @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<PercentDialogComponent>) {
    if(data){
      this.user.address = data.user.address
      this.user.percent = 0
      // this.addParticipant(data.user.address)
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    this.dialogRef.updateSize('1000vw','1000vw')
   }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.calculateTotal()
  }

  onConfirmClick(): void {
    if(this.totalSum<=100){
      var allParticipants = [this.user].concat(this.participants)
      console.log(allParticipants)
      this.dialogRef.close(allParticipants);
    }
  }

  checkValid(val: string){
    //TODO: check if valis address in BC
    if(!(/^[a-zA-Z0-9]*$/.test(val))){
      this.errorMessage="Not valid address format"
      return false
    } 
    if(!val.includes('0x')){
      this.errorMessage="Not valid address"
      return false
    }
    for(let participant of this.participants){
      if(val===participant.address){
        this.errorMessage="Already participating"
        return false
      }
    }
    return true
  }
}

//TODO: pass multiple distribution information
//