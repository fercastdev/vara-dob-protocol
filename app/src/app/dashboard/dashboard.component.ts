import { Component, OnInit } from '@angular/core';
import * as dateFns from "date-fns";
import * as shape from 'd3-shape';
import { IIndicatorData } from 'app/custom-common-modules/indicator-data';
import { SimpleSortService } from 'app/services/simple-sort.service';
import { BalanceService } from 'app/services/balance.service';
import { Subscription } from 'rxjs'
import { PoolMasterInstanceService } from 'app/blockchainUtils/pool-master-instance.service';
import { MetamaskConnectService } from 'app/blockchainUtils/metamask-connect.service';
import { PoolInstanceService } from 'app/blockchainUtils/pool-instance.service';
import { PoolMethodsService } from 'app/blockchainUtils/pool-methods.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

//Dashboard component with main indicators of global behavior of users pools

export class DashboardComponent implements OnInit {
  
  today: Date = new Date();
  insideTitle: string = "";
  insideSubtitle: string = "";
  poolsData = []
  subscriptions: Subscription[] = []
  curve = shape.curveCatmullRom;
  user = {address:''}
  web3;
  poolMasterInst;
  diffIncome=0
  activePools=0
  diffPools=0
  totalIncome=0
  total=0


  poolsList=[]
  distributions=[]
  transactions=[]
  indicatorsData=[]


  private _ready: boolean = false

  get ready(){
    return this._ready
  }

  set ready(val){
    this._ready=val
  }
  

  //check if the resolution is less than 767px
  size: boolean;

  //showlinechart : boolean = this.lineChartdata.length !==0 && this.labels.length !==0 ? true : false

  //lineChartdata hooks
  private _lineChartdata;

  get lineChartdata(){
    return this._lineChartdata
  }

  set lineChartdata(val){
    this._lineChartdata=val
  }

  // labels hooks
  private _labels;

  get labels(){
    return this._labels
  }

  set labels (val){
    this._labels=val
  }





  constructor( 
    private sortingService: SimpleSortService,
    private balance: BalanceService,
    private poolMaster: PoolMasterInstanceService,
    private walletConnect: MetamaskConnectService,
    private poolInstMaker: PoolInstanceService,
    private poolMethods: PoolMethodsService
    ) { 
      this.user.address = localStorage.getItem('token')
      // this.makeSubscription()
      this.isMobile()
      this.getPoolsBC()
    }

  ngOnInit(): void {
    
  }

  ngOnDestroy(){
    this.subscriptions.forEach((subs) => subs.unsubscribe())
  }

  isMobile(){
    if(window.screen.availWidth<767){
      this.size=true;
    }else{
      this.size=false;
    }
  }

  // makeSubscription(){
  //   var poolsSubscription = this.balance.getPools().subscribe((data:any) => {
  //     this.poolsList = data.pools;
  //   })
  //   var distSubs = this.balance.getDistributions().subscribe((data)=>{
  //     this.distributions=data.distributions
  //   })

  //   var TransSubs = this.balance.getAllTransactions().subscribe((data)=>{
  //     this.transactions=data.transactions
  //   })
  //   var balanceSubs = this.balance.getBalance().subscribe((data)=>{
  //     this.total = data.balance
  //   })

  //   var incomeSubs = this.balance.getTotalIncome().subscribe((data)=>{
  //     this.totalIncome = data.income
  //     this.diffIncome = data.differential
  //   })
  //   var poolsSubs = this.balance.getActivePools().subscribe((data)=>{
  //     this.activePools = data.numPools
  //     this.diffPools = data.differential
  //   })

  //   this.subscriptions = [poolsSubscription, balanceSubs, incomeSubs, poolsSubs, distSubs, TransSubs]
  // }

  async getPoolsBC(){

    await this.walletConnect.connectWallet(window).then((res)=>{
    }).catch((err)=>console.log(err))

    var newPools = 0 //En las ultimas 5 horas

    this.web3 = this.walletConnect.web3;
    this.poolMasterInst = this.poolMaster.createInstance(this.web3);
    await this.poolMasterInst.getPastEvents("CreatePool", { fromBlock: 1}).then((res)=>{
      //TODO: PONER FECHA A CREATE POOL EVENT
      newPools=1
    });

    var poolsAddress = []
    var pools = []
    var MyTransactions = []
  
    await this.poolMasterInst.methods.returnAllPools().call().then((pools) => {
      poolsAddress = pools
    })

    await this.stateInfo(poolsAddress).then((res)=>{
      MyTransactions=res[0]
      pools=res[1]
      MyTransactions.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
      //pools = this.getNextDisitributions(pools) // Aqui queda lista el pooslist
    });

    this.poolsList= this.getMostRecentActvity(pools)
    this.distributions = this.getNextDisitributions(pools)
    this.transactions=MyTransactions
    this.diffIncome=this.diffIncome/this.transactions.length
    this.activePools=poolsAddress.length //TODO:FILTRAR POR ESTADO ACTIVE
    this.diffPools=newPools/this.activePools
    this.prepareIndicatorsData()
    this.preparePoolsData()
    this.prepareLineChartData()
    this.ready=true
    console.log("this.transactions", this.poolsList);
    
  }

  async stateInfo(poolsAddress){
    var MyTransactions = []
    var pools = []

    for (var i=0; i < poolsAddress.length; i++){
      const poolInst = this.poolInstMaker.createInstance(this.web3,poolsAddress[i])
      var pool;
      await this.poolMethods.formatPool(poolInst, poolsAddress[i], this.web3, this.user.address).then((res)=>{
        pool = res
        pool.totalVolume = this.web3.utils.fromWei(res.totalVolume, 'ether');
        pool.token = 'ETH'
        this.total+=Number(pool.totalVolume)
      });
      await this.poolMethods.getEtherTransactions(poolInst, this.web3).then((res)=>{
        MyTransactions = MyTransactions.concat(res.transactions)
        this.totalIncome+=res.income;
        this.diffIncome+=res.incomeIncrease
        pool = {...pool, ... res}
        //ordenar transacciones por fechas
      });
      pools.push(pool)
    }
    return [MyTransactions, pools]
  }

  getNextDisitributions(pools){
    var auxPools = pools
    auxPools.sort((a,b) => (a.nextDistribution > b.nextDistribution) ? -1 : ((b.nextDistribution > a.nextDistribution) ? 1 : 0))
    var filteredPools = auxPools.slice(0,10).sort((a,b) => (a.nextDistribution > b.nextDistribution) ? 1 : ((b.nextDistribution > a.nextDistribution) ? -1 : 0))
    return filteredPools
  }

  getMostRecentActvity(pools){
    var filteredPools = []
    if (pools.length>0){
      var auxPools = pools
      filteredPools = auxPools.sort((a,b) => (a.transactions[0].date > b.transactions[0].date) ? -1 : ((b.transactions[0].date > a.transactions[0].date) ? 1 : 0))      
    } 
    return filteredPools
  }

  sortElem( elemList ,elem){
    elemList.concat(elem.transactions)
    this.sortingService.sort(elemList, 'value')
  }

  prepareLineChartData(){

    var orderedTransactions = []

    // removed duplicates date and sum values
    for (let trans of this.transactions){
      if (orderedTransactions.length === 0){
        orderedTransactions.push(trans)
      }
      else {
        if (orderedTransactions[orderedTransactions.length-1].date === trans.date){
          orderedTransactions[orderedTransactions.length-1].value += trans.value
        } else {
          orderedTransactions.push(trans)
        }
      }
    }

    //Prepare line chart parameters (just most recent 100 data)
    this.labels = orderedTransactions.map(function(x){  
      return dateFns.format(dateFns.parseJSON(x.date), 'dd MMM yyy').toString()
    })
    this.lineChartdata = orderedTransactions.map(function(x){ return x.value})
  }

  preparePoolsData(){

    //get most recent events pool
    var auxPool = {
      poolId: 0,
      address: '',
      title:'',
      mainValue:0, 
      diffValue :'', 
      currency :'', 
      insideTitle :"",
      insideSubTitle:"",
      data:[],
      }
    if (this.poolsList.length>0){
      for (var i = 0; i < 3; i++){
        auxPool.poolId = this.poolsList[i].id
        auxPool.address = this.poolsList[i].address
        auxPool.title = "Total Income"
        auxPool.mainValue = this.poolsList[i].totalVolume
        if(this.poolsList[i].transactions.length===0){
          auxPool.diffValue = '0%'
        } else if (this.poolsList[i].transactions.length===1){
          auxPool.diffValue = '100%'
        } else {
          var initial = Number(this.poolsList[i].transactions[1].value)
          var final = Number(this.poolsList[i].transactions[0].value)
          auxPool.diffValue = (((final-initial) / initial)*100).toString()+'%'          
        }

        auxPool.currency = this.poolsList[i].token
        let auxPercent = this.poolsList[i].percent*100
        auxPool.insideTitle = auxPercent.toString()+'%'
        auxPool.insideSubTitle = this.poolsList[i].name
        var auxData = this.poolsList[i].participants.map(function(x){ return x.percent})
        auxPool.data = auxData.sort()
        this.poolsData.push(auxPool)
        auxPool = {
          poolId: 0,
          address: '',
          title:'',
          mainValue:0, 
          diffValue :'', 
          currency :'', 
          insideTitle :"",
          insideSubTitle:"",
          data:[],
          }
      }      
    }

  }

  prepareIndicatorsData(){


    // First indicator
    var indicatorsData: IIndicatorData[] = []
    var indicator = {
      title: 'Total Income',
      value: this.totalIncome,
      valueType: 'currency',
      currency: 'USD',
      diffValue: this.diffIncome,
      diffValueType: 'percent',
      iconUrl: 'wallet',
      changeSymbol: this.diffIncome > 0 ? '+' : '-',
    }
    indicatorsData.push(indicator)

    // Second Indicator
    indicator = {
      title: 'Active pools',
      value: this.activePools,
      valueType: 'integer',
      currency: '',
      diffValue: this.diffPools,
      diffValueType: 'percent',
      iconUrl: 'users',
      changeSymbol: this.diffPools > 0 ? '+' : '-',
    }
    indicatorsData.push(indicator)

    // Third Indicator
    if (this.distributions.length!==0){
      var dist = dateFns.fromUnixTime(this.distributions[0].nextDistribution)
      var diffTimeDistr = dateFns.formatDistanceStrict(this.today, dateFns.parseJSON(dist))
      var indicator2 = {
        title: 'Closest distribution',
        value: Number(diffTimeDistr.split(' ')[0]),
        valueType: 'integer',
        currency: '',
        diffValue: diffTimeDistr.split(' ')[1],
        diffValueType: 'integer',
        iconUrl: 'open-source',
        changeSymbol: '+',
      }
      indicatorsData.push(indicator2)      
    }


    this.indicatorsData = indicatorsData
  }

}


//TODO: Repensar que muestra total transactions