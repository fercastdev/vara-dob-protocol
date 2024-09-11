import { Pipe, PipeTransform } from '@angular/core';
import { cryptoSymbol } from 'crypto-symbol'

const { get, nameLookup } = cryptoSymbol({})

@Pipe({
  name: 'cryptoCurrency'
})
export class CryptoCurrencyPipe implements PipeTransform {

  transform(value: number, token: string): string {
    if (!isValue(value)) return null;
    const valueFormat = +value % 1 === 0 ? '1.0-0' : '1.2-2';
    return (token + ' ' + valueFormat)
  }
} 



function isValue(value: number|string|null|undefined): value is number|string {
  return !(value == null || value === '' || value !== value);
}

