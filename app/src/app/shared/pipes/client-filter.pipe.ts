import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientFilter',
  pure: false,
})
export class ClientFilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, labelKey?: string): any {
    if (searchTerm === "" || null){
      return items;
    }
    if (!items || !searchTerm ) {
      return null;
    }
    
    return items.filter(
      item =>
        item.CLIENTE
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) === true
    ).slice(0,10);
  }
}
