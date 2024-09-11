import { Component, Input, OnInit } from '@angular/core';
import { IIndicatorData } from '../indicator-data'

//Component to make indicators cards. Data respond to IIndicatorData format

@Component({
  selector: 'app-indicator-card',
  templateUrl: './indicator-card.component.html',
  styleUrls: ['./indicator-card.component.scss']
})
export class IndicatorCardComponent implements OnInit {
  private _data = {} as IIndicatorData ;

  @Input() get data(){
    return this._data
  }

  set data( val: IIndicatorData){
    this._data=val
  }

  constructor() { }

  ngOnInit(): void {
  }

}
