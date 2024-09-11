import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';



@Component({
  selector: 'app-login-dispatch',
  templateUrl: './login-dispatch.component.html',
  styles: [
  ]
})

export class LoginDispatchComponent implements OnInit {



  constructor(
    private serviceAuth: AuthService
  ) {

  }

  ngOnInit(): void {
     let token: string = this.serviceAuth.getToken();


    let pathDispatch: string = 'https://dispatch2.redd.cl/tetris/login?token='+token;


    window.location.assign(pathDispatch);
  }


}
