import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-box-exp',
  template: 
  " <input id=icon type='text' class='filter form-control' placeholder='Search pool' [(ngModel)]='filter' />",
  styleUrls: ['./explore.component.scss']
})
export class FilterBoxExpComponent implements OnInit {
  private _filter: string;
    @Input() get filter() {
      return this._filter;
    }
    
  set filter(val: string) { 
    this._filter = val;
    this.changed.emit(this.filter); //Raise changed event
  }

  @Output() changed: EventEmitter<string> = new EventEmitter<string>();
    
  constructor() { }

  ngOnInit(): void {
  }

}
