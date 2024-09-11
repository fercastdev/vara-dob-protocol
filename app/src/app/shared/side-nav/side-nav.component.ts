import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
// import { BalanceService } from 'app/services/balance.service';
import { SidenavService } from 'app/services/sidenav.service';
import * as dateFns from "date-fns";
import { PoolMasterInstanceService } from 'app/blockchainUtils/pool-master-instance.service';
import { MetamaskConnectService } from 'app/blockchainUtils/metamask-connect.service';
import { PoolInstanceService } from 'app/blockchainUtils/pool-instance.service';
import { PoolMethodsService } from 'app/blockchainUtils/pool-methods.service';
// import { PoolSummary } from 'assets/data/pool-summary';
// import { SimpleSortService } from 'app/simple-sort.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() sideNavOpened: boolean;
  balanceSubs: any;
  web3;
  poolMasterInst;
  user= {address:''}

  @Output()
  checkSideNav = new EventEmitter<boolean>();

  private _distributions = []

  get distributions(){
    return this._distributions
  }

  set distributions(val){
    this._distributions = val
    this.setData()

  }

  listData = {}

  setData(){
    if(this.distributions.length>8){
      this.distributions=this.distributions.slice(0,8)
    }
    var auxYear = dateFns.getYear(dateFns.parseJSON(this.distributions[0].nextDistribution)).toString()
    this.listData[auxYear] = []
    for(let dist of this.distributions){
       if (dateFns.getYear(dateFns.parseJSON(dist.nextDistribution)).toString() == auxYear ){
         
         this.listData[auxYear].push(dist)
       } else {
         auxYear = dateFns.getYear(dateFns.parseJSON(dist.nextDistribution)).toString()
         this.listData[auxYear] = []
         this.listData[auxYear].push(dist)
       }
    }
    console.log('------->',this.listData)
  }

  constructor( 
    public sideNav : SidenavService, 
    // private balanceService : BalanceService,
    private poolMaster: PoolMasterInstanceService,
    private walletConnect: MetamaskConnectService,
    private poolInstMaker: PoolInstanceService,
    private poolMethods: PoolMethodsService
    ) {
      this.user.address=localStorage.getItem('token')
      this.connectBC()
  }

  // makeSubs(){
  //   this.balanceSubs = this.balanceService.getDistributions().subscribe((data)=>{
  //     this.distributions = data.distributions
  //   })
  // }

  ngOnInit(): void {
    //this.makeSubs()
    //this.setData()
  }

  ngOnDestroy(){
    this.balanceSubs.unsubscribe()
  }

  closeSideNav(){
    this.checkSideNav.emit(false);
    this.sideNavOpened= false;
  }

  async connectBC(){
    var poolsAddress = []
    var pools = []

    await this.walletConnect.connectWallet(window).then((res)=>{
    }).catch((err)=>console.log(err))


    this.web3 = this.walletConnect.web3;
    this.poolMasterInst = this.poolMaster.createInstance(this.web3);
  
    await this.poolMasterInst.methods.returnAllPools().call().then((pools) => {
      poolsAddress = pools
    })

    for (var i=0; i < poolsAddress.length; i++){
      const poolInst = this.poolInstMaker.createInstance(this.web3,poolsAddress[i])
      var pool;
      await this.poolMethods.formatPool(poolInst, poolsAddress[i], this.web3, this.user.address).then((res)=>{
        pool = res
        pool.totalVolume = this.web3.utils.fromWei(res.totalVolume, 'ether');
        pool.token = 'ETH'
      });
      pools.push(pool)
    }

    var auxPools = pools
    auxPools.sort((a,b) => (a.nextDistribution > b.nextDistribution) ? -1 : ((b.nextDistribution > a.nextDistribution) ? 1 : 0))
    var filteredPools = auxPools.slice(0,10).sort((a,b) => (a.nextDistribution > b.nextDistribution) ? 1 : ((b.nextDistribution > a.nextDistribution) ? -1 : 0))
    
    console.log('filteredPools', filteredPools)
    for (let pool of filteredPools){
      console.log(dateFns.fromUnixTime(pool.nextDistribution))
      console.log(dateFns.formatISO(dateFns.fromUnixTime(pool.nextDistribution)))
      pool.nextDistribution = dateFns.formatISO(dateFns.fromUnixTime(pool.nextDistribution))
    }
    this.distributions=pools
  }


}
