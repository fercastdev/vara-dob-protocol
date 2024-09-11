import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MockPools } from 'assets/data/mock-pools';
import { MockPoolSummary } from 'assets/data/pool-summary';
import { PoolTransactions } from 'assets/data/pool-transactions';
import { environment } from 'environments/environment';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, Subject, of } from "rxjs";
import { Pool } from '../shared/interfaces/pool';
import { PoolSummary } from '../shared/interfaces/pool-summary';
import { Transaction } from '../shared/interfaces/transaction';

@Injectable({
  providedIn: 'root'
})
export class PoolService {

  pools: PoolSummary[];
  pool : Pool;
  transactions: Transaction[]
  USE_BACKEND = true

  constructor(private http: HttpClient) { }



  getPoolSummary( address = ''){
    console.log('Fetching pool data')
    return this.http.get<any>(`${environment.baseUrl}/poolsummary/${address}`).pipe(
      tap(_ => console.log('Pools fetched')),
      map(data => data.pool)
    );
    // var found = false
    // var i = 0
    // var poolSummary : PoolSummary;
    // while ( !found || i<MockPoolSummary.length){
    //   if (MockPoolSummary[i].address === address){
    //     found = true
    //     poolSummary = MockPoolSummary[i]
    //   }
    //   i++
    // }
    // return of(poolSummary)
  }

  getPool( address = '' ){
    console.log('Fetching pool data');
    return this.http.get<any>(`${environment.baseUrl}/pool/${address}`).pipe(
      tap(_ => console.log('Pool fetched')),
      map(data => data.pool)
    );
    // console.log('Fetching pool data')
    // var found = false
    // var i = 0
    // var pool : Pool;
    // while ( !found || i<MockPools.length){
    //   if (MockPools[i].address === address){
    //     pool = MockPools[i]
    //     found = true
    //   }
    //   i++
    // }
    // return of(pool)
  }

  getPoolTransactions( address='' ): Observable<any>{
    console.log('Fetching transactions')
      return this.http.get<any>(`${environment.baseUrl}/pool/transactions/${address}`).pipe(
        tap(_ => console.log('Transactions fetched')),
        map(data => data)
      );
      // var found = false
      // var i = 0
      // var transactions;
      // while ( !found || i< PoolTransactions.length){
      //   if (PoolTransactions[i].address === address){
      //     transactions = PoolTransactions[i]
      //     found = true
      //   }
      //   i++
      // }
      // return of(transactions)
  }

  deposit(address='', value: number){
    console.log('Transfering')
    //let headers = new HttpHeaders();
    let formData = new FormData();
    formData.append('value', value.toString());
    return this.http.post<any>(`${environment.baseUrl}/pool/deposit/${address}`, formData);
    // var poolSumI = MockPoolSummary.findIndex(element => element.address === address )
    // var poolI = MockPools.findIndex(element => element.address === address)
    // MockPoolSummary[poolSumI].TotalVolume += value
    // MockPools[poolI].totalVolume += value
    // console.log('success')
    // return of(MockPoolSummary[poolSumI])

  }

  join(adress=''){
    if (this.USE_BACKEND){
      // POST to API
    } else {
      console.log('success')
    }
  }


}
