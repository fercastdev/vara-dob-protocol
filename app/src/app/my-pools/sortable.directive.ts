import { Directive, Input } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

//Directive to sort pools by different parameters

export class SortableDirective {
  dir: number = -1;
  options: object = { "-1": "desc", "1":"asc" }
  @Input() sortable: string = '';
  @Input() direction: SortDirection = '';
  
  rotate () {
    this.dir = this.dir * -1
    this.direction = this.options[this.dir.toString()]
  }

}
