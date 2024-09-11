import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';



@Component({
  selector: 'app-user-url',
  templateUrl: './user-url.component.html',
  styles: [
  ]
})

export class UserUrlComponent implements OnInit {



  constructor(
    private serviceAuth: AuthService
  ) {

  }

  ngOnInit(): void {
    let userId: string = this.serviceAuth.getUserId();

    let params = {
      "ds0.cli_general": userId,
      "ds47.url" : userId,
      "ds57.cliente" : userId,
      "ds55.user": userId
    }
    
    let paramsAsString = JSON.stringify(params);
    let encodedParams = encodeURIComponent(paramsAsString)
    let reporteById: string = 'https://datastudio.google.com/u/0/reporting/ae2b6fd5-f90f-43a6-aaef-69bec7d3be22/page/BT5RC?params='+encodedParams;


    window.location.assign(reporteById);

    console.log(reporteById)

  }



}
