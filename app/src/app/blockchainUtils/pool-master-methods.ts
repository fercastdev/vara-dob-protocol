import { Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import Web3 from 'web3';
import {Pool} from '../shared/interfaces/pool';

@Injectable({
  providedIn: 'root'
})
export class PoolMasterMethodsService {
  public poolData : any[] = [];

  constructor() { }

  async getallPools(poolMasterInstance, poolInstance, userAddress, web3) {
    poolMasterInstance.methods.returnAllPools().call().then((pools) => {
      pools.forEach(async (poolAddress) => {
        var poolInfo = {
          isLoading:true, 
          contract:undefined, 
          address:'', 
          poolsTokens:false, 
          participants:[], 
          tokenInitialPercent:0, 
          maxTotalToken:'',
          nextDistribution:0,
          distributionDate:[],
          maxNumParticipants:0,
          percent:0
        }
        var maxtotaltoken = ''
        const poolInst = poolInstance(poolAddress);

        await poolInst.methods.getDetails().call().then((poolData) => {
          poolInfo = poolData;
          poolInfo.isLoading = false;
          poolInfo.contract = poolInst;
          poolInfo.address = poolAddress;
          this.poolData.push(poolInfo);
          maxtotaltoken = poolData.maxTotalToken;
        });

        await poolInst.methods.getDistributionDetails().call().then((poolData) => {
          poolInfo.nextDistribution = poolData.nextDistr;
          poolInfo.distributionDate = poolData.ditrDates;
          poolInfo.maxNumParticipants = poolData.maxNumParticipants;
        });

        var tokenBalance =''
        await poolInst.methods.getTokenBalance(poolAddress).call().then((res)=>{
          tokenBalance=res.toString()
        });

        await poolInst.methods.basicInfo().call().then((res)=>{
          poolInfo.tokenInitialPercent = res.tokenInitialPercent
        })

        if(tokenBalance == maxtotaltoken){
          poolInfo.poolsTokens = true;
        } else {
          poolInfo.poolsTokens = false;
        }

        await poolInst.methods.getParticipations().call().then((participants)=>{
          for(var i = 0; i<participants.length;i++){
            var user = {name:'Unknown', address:participants[i][0], tokens:participants[i][1], fisrtTime:participants[i][2], percent:0}
            poolInfo.participants.push(user)

            var rawPercent = web3.utils.toBN(user.tokens).mul(web3.utils.toBN(100)).div(web3.utils.toBN(poolInfo.maxTotalToken)).toString()
            var percent = Number(rawPercent)/100
            var initialPercent = Number(poolInfo.tokenInitialPercent)/100
            user.percent = percent/initialPercent
            if(user.address == userAddress){
              poolInfo.percent = percent/initialPercent
            }
          }
        })
      });
    });
    return of(this.poolData)
  }

  async getUsersPools(userAddress,poolMasterInstance, poolInstance, poolData, web3){
    await this.getallPools(poolMasterInstance, poolInstance, userAddress, web3)
    var userPools = []
    var notUsersPools = []
    for (var pool of poolData){
      var hasIt = false
      var count = 0
      while(!hasIt && count < pool.participants.length){
        if (pool.participants.address == userAddress){
          hasIt = true
        }
        count ++;
      }
      if (hasIt){
        userPools.push(pool)
      } else {
        notUsersPools.push(pool)
      }
    }
    return {userPools: userPools, notUsersPools:notUsersPools}
  }

  create(newPool, poolMasterInstance, account) {
    newPool.isLoading = true;
    poolMasterInstance.methods.createPool(
      newPool.name,
      newPool.durationInDays,
      newPool.nextDistribution,
      newPool.distributionDates,
      newPool.numParticipants,
      newPool.tokenSymbol,
      newPool.tokenInitialPercent,
      newPool.publicAccess
    ).send({
      from: account,
    }).then((res) => {
      console.log(res)
      var poolInfo = {contract:res.to, isLoading :false, totalVolume:0, currentState:0};
      return poolInfo
    }).catch((err)=>{
      console.log(err);
      return undefined
    });
  }

}
