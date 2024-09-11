import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Observable, of, throwError } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MetamaskConnectService {
  public web3: Web3;
  public userAddress : string;
  public message : string;

  constructor() { }

  async connectWallet (window: any){
    const { ethereum } = window;
    console.log('1');
    var isConnected = false

    if (typeof window.ethereum !== 'undefined' ) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await ethereum.request({ method: 'eth_requestAccounts' }).then((res)=>{
          console.log('1.1', res)
          this.web3 = window.web3
          isConnected=true

          // return of(this.web3);
        }).catch((err)=>{
          console.log('1.2', err)
          this.message = err;
          isConnected = false
          // return err
        });
      } catch (error) {
        // User denied account access...
        console.log(error)
        this.message = error
        isConnected = false

        // return error
      }
    } else if (window.web3) {
      // Legacy dapp browsers...
      window.web3 = new Web3(this.web3.currentProvider);
      this.web3 = window.web3
      isConnected = true
      //return of(this.web3);
    }  else {
      // Non-dapp browsers...
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      this.message = 'Non-Ethereum browser detected. You should consider trying MetaMask!'
      isConnected = false
      //return(new Error('Non-Ethereum browser detected. You should consider trying MetaMask!') )
    }
    console.log('2');

    return of(isConnected);
  }  

}
