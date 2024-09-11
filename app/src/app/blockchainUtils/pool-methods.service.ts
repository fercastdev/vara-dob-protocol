import { Injectable } from '@angular/core';
import * as dateFns from "date-fns";


@Injectable({
  providedIn: 'root'
})
export class PoolMethodsService {

  constructor() { }

  async formatPool(poolInst, poolAddress, web3, userAddress){
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
      percent:0,
      totalVolume:0
    }
    var maxtotaltoken = ''
    await poolInst.methods.getDetails().call().then((poolData) => {
      
      poolInfo ={...poolData};
      poolInfo.isLoading = false;
      poolInfo.contract = poolInst;
      poolInfo.address = poolAddress;
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

    poolInfo.participants = []
    await poolInst.methods.getParticipations().call().then((participants)=>{
      poolInfo.percent = 0
      for(var i = 0; i<participants.length;i++){
        var user = {name:'Unknown', address:participants[i][0], tokens:participants[i][1], fisrtTime:participants[i][2], percent:0}
        poolInfo.participants.push(user)

        var rawPercent = web3.utils.toBN(user.tokens).mul(web3.utils.toBN(100000)).div(web3.utils.toBN(poolInfo.maxTotalToken)).toString()
        var percent = Number(rawPercent)/100000
        var initialPercent = Number(poolInfo.tokenInitialPercent)/100
        user.percent = percent/initialPercent
        if(user.address === userAddress){
          poolInfo.percent = percent/initialPercent
        }
      }
    })
    return poolInfo
  }

  async getEtherTransactions(poolInst, web3){
    var pool = {income : 0, incomeIncrease : 0}
    var transactions = []
    var recentDate = '0'
    var lastTrans = {}
    await poolInst.getPastEvents("DepositReceived", { fromBlock: 1}).then((res)=>{
      var count = res.length
      if (count !== 0){
        for (let trans of res){
          var amount = web3.utils.fromWei(trans.returnValues.amount, 'ether');
          pool.income += Number(amount)
          transactions.push({value:web3.utils.fromWei(trans.returnValues.currentTotal, 'ether'), date:dateFns.parseJSON(dateFns.fromUnixTime(trans.returnValues.date)), amount:web3.utils.fromWei(trans.returnValues.amount, 'ether')})
        }
        var last = web3.utils.fromWei(res[count-1].returnValues.amount, 'ether');
        pool.incomeIncrease =  Number(last) / pool.income        
      } else {
        pool.income = 0
        pool.incomeIncrease = 0
      }

    });
    await poolInst.getPastEvents("EtherDistributionSent", { fromBlock: 1}).then((res)=>{
      if (res.length>0){
        var date = res[0].returnValues.date
        for (let trans of res){
          transactions.push({value:web3.utils.fromWei(trans.returnValues.currentTotal, 'ether'), date:dateFns.parseJSON(dateFns.fromUnixTime(trans.returnValues.date)), amount:web3.utils.fromWei(trans.returnValues.amount, 'ether')})
        }        
      } 

    });
    transactions = transactions.sort((a,b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0))

    return{...pool, transactions: transactions}
  }

}
