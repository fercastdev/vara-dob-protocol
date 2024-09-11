import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class PoolMasterInstanceService {

  private web3: Web3

  public address = '0xCdA05eB4Abc108eFE8dBebE7958e1c280d34E8bD'; // --> change with deploy in ganache 
  public abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "comissionFeeInput",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "contractAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "poolStarter",
          "type": "address"
        }
      ],
      "name": "CreatePool",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "wallet",
          "type": "address"
        }
      ],
      "name": "NewRegister",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getCreator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
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
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "returnAllParticipants",
      "outputs": [
        {
          "internalType": "contract Participant[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "durationInDays",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "firstDitribution",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "ditributionDates",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "numParticipants",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "tokenSymbol",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "tokenInitialPercent",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "publicAccess",
          "type": "bool"
        }
      ],
      "name": "createPool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "signUp",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "checkIfUser",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "checkDistribution",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  constructor() { }

  createInstance(web3){
    return  new web3.eth.Contract(this.abi, this.address);
  }

}
