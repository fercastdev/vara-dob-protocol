import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeTruckFilter',
  pure: false,
})
export class ActiveTruckFilterPipe implements PipeTransform {
  transform(items: any[], activeOnly?: boolean): any {
    let active = [];
    let notActive = [];
    let i = 0;
    items.forEach(truck => {
      truck.i = i
      if (truck.details.active ){
        active.push(truck);
      }
      else{
          notActive.push(truck);
      } 
      i++; 
    } )
    if (activeOnly){
      return active
    }
    else{
      return active.concat(notActive)  ;
    }
  }
}
