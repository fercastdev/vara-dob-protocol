import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserProfileService } from 'app/services/user-profile.service';
import { Userprof } from '../shared/interfaces/user';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})


export class UserProfileComponent implements OnInit {
  userInfo: FormGroup;
  visible=false;
  enablename=true;
  enableemail=true;
  
  user: Userprof; //Acá se almacena todo
  

  constructor(private userProfileService: UserProfileService, 
              private route:ActivatedRoute, private formBuilder:FormBuilder) {
    let id = +this.route.snapshot.paramMap.get('id');
    this.userProfileService.getUser(id)
      .subscribe((prof: Userprof)=>{
        this.user = prof
        this.userInfo.setValue({
          'inputname': this.user.name,
          'inputemail': this.user.email
        })
      });
    this.buildForm();
  }

  ngOnInit(): void {
  }

  toggleUsername(): void{
    if(this.enablename==true){
      this.userInfo.get('inputname').enable()
    }else{
      this.userInfo.get('inputname').disable()
    }
    this.enablename=!this.enablename
  }
  
  toggleEmail(): void{
    if(this.enableemail==true){
      this.userInfo.get('inputemail').enable()
    }else{
      this.userInfo.get('inputemail').disable()
    }
    this.enableemail=!this.enableemail
  }

  
  visibleSuccess(): void{
    this.visible=false;
  }
  
  save(event: Event): void{
    event.preventDefault();
    const value = this.userInfo.value
    console.log(value);
    let cambioname=false, cambioemail=false;

    if(value.inputname!=undefined && value.inputname!=null){
      console.log("Hay cambios name");
      this.user.name = value.inputname
      cambioname=true
    }
    if(value.inputemail!=undefined && value.inputemail!=null){
      console.log("Hay cambios email");
      this.user.email = value.inputemail
      cambioemail=true;
    }

    if(cambioname || cambioemail){
      console.log("Hay cambios");
      cambioname=false, cambioemail=false;
      this.visible=true;
      setTimeout( this.visibleSuccess,2000);
    }else{
      console.log("no hay cambios");
      
    }
  }

  CopyAddress(val: string): void{
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      alert('Copied!')
  }

  private buildForm(){
    this.userInfo = this.formBuilder.group({
      inputname: [{value: '', disabled: this.enablename}, [Validators.required]],
      inputemail: [{value: '', disabled: this.enableemail}, [Validators.email]],
    })
  }

}
