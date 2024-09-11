import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MockPoolSummary } from 'assets/data/pool-summary';
import { PoolSummary } from '../shared/interfaces/pool-summary';
import { SimpleSortService } from './simple-sort.service';
import * as dateFns from "date-fns";
import { environment } from 'environments/environment';
import { catchError, map, tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  USE_BACKEND = false
  pools: PoolSummary[];


  constructor( private http: HttpClient, private sortingService: SimpleSortService ) { }

  getBalance(){
    console.log('Fetching balance')
    return this.http.get<any>(`${environment.baseUrl}/balance`).pipe(
      tap(_ => console.log('Balance fetched')),
      map(data => data)
    );
    // return { balance: 22342123 }
  }

  getTotalIncome(){
    return this.http.get<any>(`${environment.baseUrl}/income`).pipe(
      tap(_ => console.log('Income fetched')),
      map(data => data)
    );
    // return { income: 53000, differential: 0.55 }

  }

  getActivePools(){
    return this.http.get<any>(`${environment.baseUrl}/activePools`).pipe(
      tap(_ => console.log('Pools fetched')),
      map(data => data)
    );
    // return { activePools: MockPoolSummary.length, differential: 0.07 }

  }

  getPools(){
    console.log('Fetching pools')
    return this.http.get<any>(`${environment.baseUrl}/pools`)
    // if (this.USE_BACKEND){
    //   return this.http.get<any>(`${environment.baseUrl}/pools`)
    // } 
    // else {
    //   return of(MockPoolSummary)
    // }
  }

  getDistributions(){
    return this.http.get<any>(`${environment.baseUrl}/distributions`).pipe(
      tap(_ => console.log('Distributions fetched')),
      map(data => data)
    );
    // if (this.USE_BACKEND){
    //   // GET to API
    // } else {
    //   var listData = {}
    //   var auxPools = MockPoolSummary
    //   this.sortingService.sort(auxPools, 'nextDistribution')

    //   auxPools = auxPools.reverse().slice(0,8)
    //   var auxYear = dateFns.getYear(dateFns.parseJSON(auxPools[0].nextDistribution)).toString()
    //   listData[auxYear] = []
    //   for(let dist of auxPools){
    //      if (dateFns.getYear(dateFns.parseJSON(dist.nextDistribution)).toString() === auxYear ){
    //        listData[auxYear].push(dist)
    //      } else {
    //        auxYear = dateFns.getYear(dateFns.parseJSON(dist.nextDistribution)).toString()
    //        listData[auxYear] = []
    //        listData[auxYear].push(dist)
    //      }
    //   }
    //   return listData
    // }

  }

  getAllTransactions(){
    return this.http.get<any>(`${environment.baseUrl}/transactions`).pipe(
      tap(_ => console.log('Transactions fetched')),
      map(data => data)
    );
  }

}
