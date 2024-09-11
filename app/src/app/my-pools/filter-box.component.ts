import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-box',
  template: 
  " <input id=icon type='text' placeholder='Search pool' [(ngModel)]='filter' />",
  styleUrls: ['./my-pools.component.scss']
})
export class FilterBoxComponent implements OnInit {
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
