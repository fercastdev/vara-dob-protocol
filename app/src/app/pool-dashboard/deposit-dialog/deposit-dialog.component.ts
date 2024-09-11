import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deposit-dialog',
  templateUrl: './deposit-dialog.component.html',
  styleUrls: ['./deposit-dialog.component.scss']
})


export class DepositDialogComponent implements OnInit {
  message: string = ""
  amount = 0
  confirmButtonText = "Ok"
  cancelButtonText = "Cancel"


  constructor(    
    @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<DepositDialogComponent>) {
    if(data){
      console.log(data)
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

  onConfirmClick(): void {
    this.dialogRef.close(this.amount);
  }

}
