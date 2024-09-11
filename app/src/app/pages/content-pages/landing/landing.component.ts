import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  walletImageUrl = "assets/img/walletImage.svg";
  tokensImageUrl = "assets/img/tokenImage.svg";
  logoUrl = "assets/img/Dober-horizontal-logo.svg";


  constructor() { }

  ngOnInit(): void {
  }

}
