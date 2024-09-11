import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-other-option-dialog',
  templateUrl: './other-option-dialog.component.html',
  styleUrls: ['../create-pool.component.scss']
})

//Other option dialog component, angular material dialog to include a costum option of distribution peridiocity.

export class OtherOptionDialogComponent implements OnInit {
  title: string = "How often do you want to have a distribution?"
  message: string = "Every "
  confirmButtonText = "Ok"
  cancelButtonText = "Cancel"
  peridiocityAmount: number = 0;
  peridiocityUnit: string = "";
  options: string[] = ["years", "months", "days"];

  constructor(    
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<OtherOptionDialogComponent>) {
      if(data){
        
        this.message = data.message || this.message;
        if (data.buttonText) {
          this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
      this.dialogRef.updateSize('500vw','500vw')
    }

  ngOnInit(): void {
    
  }
  onConfirmClick(): void {
    let answer:string = this.peridiocityUnit+','+this.peridiocityAmount.toString()+',other'
    this.dialogRef.close(answer);
  }

}
