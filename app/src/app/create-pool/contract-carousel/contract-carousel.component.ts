import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { Observable, interval } from 'rxjs';
import { startWith, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-contract-carousel',
  templateUrl: './contract-carousel.component.html',
  styleUrls: ['./contract-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})

//Contract carousel component, to show different type of contracts. The main idea is to minimize errors that may occure in the combination of parameters.

export class ContractCarouselComponent implements OnInit {
  @Input() carouselItems: object[];
  @Output() selectFunc: EventEmitter<object> = new EventEmitter<object>();

  private _selectedType: object;

  get selectedType (){
    return this._selectedType
  }

  set selectedType(item: object){
    this._selectedType = item
    
  }

  imgags = [
    'assets/bg.jpg',
    'assets/car.png',
    'assets/canberra.jpg',
    'assets/holi.jpg',
  ];
  public carouselTileItems$: Observable<number[]>;
  tempData: any[];

  public carouselTileConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
    point: {
      visible: true,
    },
    touch: true,
    loop: true,
    animation: 'lazy',
    //speed: 250, ----------------- enable for auto-animation speed
    //interval: { timing: 1500 },-- enable for auto-animation time interval    
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.tempData = [];
    this.carouselTileItems$ = interval(500).pipe(
      startWith(-1),
      take(30),
      map((val) => {
        const data = (this.tempData = [
          ...this.tempData,
          this.imgags[Math.floor(Math.random() * this.imgags.length)],
        ]);
        return data;
      })
    );
  }

  typeSelected(item: object){
    this.selectedType=item
    this.selectFunc.emit(item)
  }
}
