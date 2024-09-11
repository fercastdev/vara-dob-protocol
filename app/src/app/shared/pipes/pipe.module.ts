import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { ActiveTruckFilterPipe} from './active-truck.pipe'
import { FilterPipe } from './filter.pipe';
import { SearchPipe } from './search.pipe';
import { ShortNamePipe } from './short-name.pipe';
import { ClientFilterPipe} from './client-filter.pipe';
import { CryptoCurrencyPipe } from './crypto-currency.pipe';

@NgModule({
  declarations:[FilterPipe, SearchPipe, ShortNamePipe, ClientFilterPipe, ActiveTruckFilterPipe, CryptoCurrencyPipe], 
  imports:[CommonModule],
  exports:[FilterPipe, SearchPipe, ShortNamePipe, ClientFilterPipe, ActiveTruckFilterPipe,CryptoCurrencyPipe], 
})

export class PipeModule{}
