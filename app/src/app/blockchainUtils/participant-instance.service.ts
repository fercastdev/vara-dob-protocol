import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParticipantInstanceService {

  public abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newUserWallet",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "returnAllPools",
      "outputs": [
        {
          "internalType": "contract Pool[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "updateBalance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWallet",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  constructor() { }
  createInstance(web3, address){
    return  new web3.eth.Contract(this.abi, address);
  }
}
