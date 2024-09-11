import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { SortingService } from 'app/services/sorting.service';
import { SortableDirective } from './sortable.directive';
import * as dateFns from "date-fns";
import { BalanceService } from 'app/services/balance.service';
import { CreatePoolService } from 'app/services/create-pool.service';
import { formPool } from 'app/shared/interfaces/formpool';
import { MetamaskConnectService } from 'app/blockchainUtils/metamask-connect.service';
import { PoolMasterInstanceService } from 'app/blockchainUtils/pool-master-instance.service';
import { PoolMethodsService } from 'app/blockchainUtils/pool-methods.service';
import { PoolInstanceService } from 'app/blockchainUtils/pool-instance.service';

@Component({
  selector: 'app-my-pools',
  templateUrl: './my-pools.component.html',
  styleUrls: ['./my-pools.component.scss']
})

//My pools component interface to interact with specific users pools

export class MyPoolsComponent implements OnInit {

  title: string;
  private user = {address:''}
  private _pools: any[];
  private poolSubscription: any;
  private web3;
  private poolMasterInst;
  drafts: any[];
  ready = false;
  results: boolean;

  get pools (){
    return this._pools
  }

  set pools (value) {
    if(value){
      this.filteredPools = this._pools = value;
      console.log(this.filteredPools)
    }
  }
  filteredPools: any[];

  //Content to show; false => pools, true => drafts
  private _showDrafts: boolean = false;

  get showDrafts (){
    return this._showDrafts
  }

  set showDrafts ( val: boolean ){
    this._showDrafts = val
  }


  //Visualization mode: matrix o list
  matrixMode: boolean = true;

  //Table atributes
  page: number = 1;
  pageSize: number = 10;
  sortAttribute: string;
  sortDirection: string = "desc";

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(
    private sortingService: SortingService,
    private balanceService: BalanceService,
    private createService: CreatePoolService,
    private walletConnect: MetamaskConnectService,
    private poolMaster: PoolMasterInstanceService,
    private poolMethods: PoolMethodsService,
    private poolInstMaker: PoolInstanceService,
    ) { 
      this.user.address = localStorage.getItem('token')
      this.getPools()
    }

  ngOnInit (): void {
    // this.getPools()
    this.getDrafts()
  }

  async getPools(){
    console.log('entreeeee')
    await this.walletConnect.connectWallet(window).then((res)=>{
    }).catch((err)=>console.log(err))

    var newPools = 0 //En las ultimas 5 horas

    this.web3 = this.walletConnect.web3;
    this.poolMasterInst = this.poolMaster.createInstance(this.web3);

    var poolsAddress = []
    var pools = []
  
    await this.poolMasterInst.methods.returnAllPools().call().then((pools) => {
      poolsAddress = pools
    })

    await this.stateInfo(poolsAddress).then((res)=>{
      this.pools=res
      this.sort("percent")
    });

    console.log(this.pools)
    this.ready = true

    // this.poolSubscription = this.balanceService.getPools().subscribe((data) => {
    //   console.log('[my-pools component]', data.pools)
    //   this.pools = data.pools
    //   this.sort("percent")
    // })
    this.title = 'My pools';
  }

  async stateInfo(poolsAddress){
    var pools = []

    for (var i=0; i < poolsAddress.length; i++){
      const poolInst = this.poolInstMaker.createInstance(this.web3,poolsAddress[i])
      var pool;
      await this.poolMethods.formatPool(poolInst, poolsAddress[i], this.web3, this.user.address).then((res)=>{
        pool = res
        pool.totalVolume = this.web3.utils.fromWei(res.totalVolume, 'ether');
        pool.token = 'ETH'
      });
      await this.poolMethods.getEtherTransactions(poolInst, this.web3).then((res)=>{
        pool = {...pool, ... res}
        //ordenar transacciones por fechas
      });
      pools.push(pool)
    }
    console.log(pools)
    return pools
  }

  getDrafts(){
    this.createService.getDrafts().subscribe((draft) => {
      this.drafts = draft
    })
  }

  getPercent(step1: any) {
    let aux=step1+'%'
    return aux;
  }

  ngOnDestroy () {
    // this.poolSubscription.unsubscribe()
  }

  //Change visualization mode
  changeMode () {
    this.matrixMode = !this.matrixMode
  }

  //Sort by attribute
  sort (prop: string) {
    if (this.sortAttribute == ""){
      this.sortAttribute = prop
    }
    if (prop === this.sortAttribute) {
      this.sortDirection = "asc"
    } else {
      this.sortDirection = "desc"
      this.sortAttribute = prop
    }

    this.headers.forEach(header => {
      if (header.sortable !== prop) {
        header.direction = '';
      }
    });

    this.sortAttribute=prop
    this.sortingService.sort(this.pools, prop);
  }

  //filter pools by input
  filter (data: string) {
    if (data) {
      this.filteredPools = this.pools.filter((p: any) => {
          return p.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
              p.address.toLowerCase().indexOf(data.toLowerCase()) > -1
        });
        
    } else {
        this.filteredPools = this.pools;
    }
  }

  //Set pool status on next distribution date
  setStatus (pool :any ){
    try {
      var distribution = dateFns.parseJSON(pool.nextDistribution)
      var diff = dateFns.formatDistanceToNowStrict(distribution)   
      var status = '' 
      if (diff.split(' ')[1] === 'days' && parseFloat(diff.split(' ')[0]) < 7){
        status='Close to distribution'
      } else {
        status='Active'
      }
      return status
    } catch (err){
      console.log("my-pools.component error: ", err)
    }
  }

}
