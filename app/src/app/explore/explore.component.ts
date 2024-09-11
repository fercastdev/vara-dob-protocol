import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { PoolInstanceService } from '../blockchainUtils/pool-instance.service';
import { MetamaskConnectService } from '../blockchainUtils/metamask-connect.service';
import { PoolMasterMethodsService } from '../blockchainUtils/pool-master-methods';
import { PoolMasterInstanceService } from '../blockchainUtils/pool-master-instance.service';
import { SortingService } from '../services/sorting.service';
import { BalanceService } from '../services/balance.service';
import { SortableDirective } from '../my-pools/sortable.directive';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})


export class ExploreComponent implements OnInit {
  
  constructor(
    private poolInstMaker:PoolInstanceService,
    private walletConnect:MetamaskConnectService, 
    private poolMaster: PoolMasterInstanceService,
    private poolMethod: PoolMasterMethodsService,
    private sortingService: SortingService,
    private balanceService: BalanceService
  ) { }
  
  expools: any;
  title: string;
  private _pools: any[];
  private poolSubscription: any;
  drafts: any[];
    
  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  ngOnInit(): void {
    this.funcionX()
    this.getPools()
  }
  
  async funcionX(){

    let web3: any;
    
    await this.walletConnect.connectWallet(window).then((res)=>{
      web3 = res
      console.log('WEB 3: Explore', web3)
    }).catch((err)=>console.log(err))
    
    web3 = this.walletConnect.web3;
    console.log('---->',web3)
    
    let poolMasterInst = this.poolMaster.createInstance(web3);
    console.log('poolMasterInst', poolMasterInst)

    /* this.expools = this.poolMethod.getPools(poolMasterInst, this.poolInstMaker.abi) */
  }


  get pools (){
    return this._pools
  }

  set pools (value) {
    if(value){
      this.filteredPools = this._pools = value;
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



  getPools(){
    this.poolSubscription = this.balanceService.getPools().subscribe((data) => {
      console.log('[my-pools component]', data.pools)
      this.pools = data.pools
      this.sort("percent")
    })
    this.title = 'My pools';
  }

  getPercent(step1: any) {
    let aux=step1+'%'
    return aux;
  }

  ngOnDestroy () {
    this.poolSubscription.unsubscribe()
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

}
