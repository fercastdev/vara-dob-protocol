import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoolInstanceService {
  public abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "poolMasterAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "poolStarter",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "poolName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "tokenAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "tokenInitialPercent",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "tokenSymbol",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "publicAccess",
              "type": "bool"
            }
          ],
          "internalType": "struct PoolObject",
          "name": "newPoolObj",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "comissionFee",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nextDistribution",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "distributionDates",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256",
              "name": "numParticipants",
              "type": "uint256"
            }
          ],
          "internalType": "struct DistributionObject",
          "name": "newDitrInfo",
          "type": "tuple"
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
          "name": "contributor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "currentTotal",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "date",
          "type": "uint256"
        }
      ],
      "name": "DepositReceived",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "currentTotal",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "date",
          "type": "uint256"
        }
      ],
      "name": "EtherDistributionSent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "MintedTokens",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "TokensParticipationSent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "updateDistributionAmount",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "basicInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "poolName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "tokenAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "tokenInitialPercent",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "tokenSymbol",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "publicAccess",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "completeAt",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "creator",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "distributionInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "comissionFee",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "nextDistribution",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "numParticipants",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "distributions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "state",
      "outputs": [
        {
          "internalType": "enum State",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "contract PoolToken",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "share",
          "type": "uint256"
        }
      ],
      "name": "joinToPool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "updateDistributionsAmounts",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "distribute",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "doFirstTokenDistribution",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "updateNextDistribution",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getParticipations",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "participation",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "firstDistribution",
              "type": "bool"
            }
          ],
          "internalType": "struct PoolShare[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getDistributionsAmounts",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDetails",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "creatorAddress",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "ownerAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "enum State",
          "name": "currentState",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "totalVolume",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maxTotalToken",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "tokenSymbol",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDistributionDetails",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "nextDistr",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "ditrDates",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "maxNumParticipants",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
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
      "name": "getTokenBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNextDistribution",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  constructor() { }

  createInstance (web3, address){
    return  new web3.eth.Contract(this.abi, address);
  }
}
