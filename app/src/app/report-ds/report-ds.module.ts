import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUrlComponent } from './user-url/user-url.component';
import { AuthService } from '../shared/auth/auth.service';
import { LoginDispatchComponent } from './login-dispatch/loginDispatch.component';



@NgModule({
  declarations: 
  [
    UserUrlComponent,
    LoginDispatchComponent
  ],
  
  imports: [
    CommonModule
  ],
  exports:[
    UserUrlComponent,
    LoginDispatchComponent
  ],

  providers:[
    AuthService
  ]
})
export class ReportDsModule { }
