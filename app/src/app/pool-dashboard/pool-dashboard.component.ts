import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IIndicatorData } from 'app/custom-common-modules/indicator-data';
import { NavbarService } from 'app/services/navbar.service';
import { SidenavService } from 'app/services/sidenav.service';
import * as shape from 'd3-shape';
import { PoolService } from 'app/services/pool.service';
import { SimpleSortService } from 'app/services/simple-sort.service';
import * as dateFns from "date-fns";
import { Transaction } from 'app/shared/interfaces/transaction';
import { PoolInstanceService } from 'app/blockchainUtils/pool-instance.service';
import { MetamaskConnectService } from 'app/blockchainUtils/metamask-connect.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DepositDialogComponent } from './deposit-dialog/deposit-dialog.component';
import { PoolMethodsService } from 'app/blockchainUtils/pool-methods.service';



@Component({
  selector: 'app-pool-dashboard',
  templateUrl: './pool-dashboard.component.html',
  styleUrls: ['./pool-dashboard.component.scss']
})

// Pool dashboard component with main indicators of global behavior of one users pool

export class PoolDashboardComponent implements OnInit {
  user = {address:''}
  web3;
  poolInst;
  total: number = 0
  poolId: string;
  insideTitle: string = "0%";
  found: boolean
  sortedParticipants: any[] =[];
  others: any[];
  showOthers: boolean = false;
  size: boolean;
  totalOthers: number = 0;
  colors: string[] = ['#9A99FF', '#FCAD57', '#FCCC22', '#71EBCD', '#3E54D3']
  subscriptions: any[] = []

  displayedColumns: string[] = ['participant-name','address', 'percent'];

  private _ready: boolean
  get ready (){
    return this._ready
  }

  set ready(val){
    this._ready=val
  }


  private _pool: any;

  get pool(){
    return this._pool
  }

  set pool(val){
    this._pool=val
    //this.prepareData()
  }


  private _transactions: any[] = [];

  get transactions(){
    return this._transactions
  }

  set transactions(val){
    this._transactions=val
    this.getPoolTransactions()
  }

  dataSource=[
    {name: "nombre1", percent:0.4},
    {name: "nombre1", percent:0.3},
    {name: "nombre1", percent:0.2},
    {name: "nombre1", percent:0.15},
    {name: "nombre1", percent:0.05},
  ]

  poolData = this.dataSource.map(function(x){ return x.percent})

  indicatorsData: IIndicatorData[] 

  curve = shape.curveCatmullRom;
  lineChartdata : number[] = []
  labels : string[] = []

  constructor( 
    public nav: NavbarService, 
    public accessSideNav: SidenavService, 
    private route: ActivatedRoute,
    private location: Location,
    private sortingService: SimpleSortService,
    private poolService: PoolService,
    private poolInstMaker: PoolInstanceService,
    private walletConnect: MetamaskConnectService,
    private dialog: MatDialog, 
    private poolMethods: PoolMethodsService
    ) {
    this.user.address = localStorage.getItem('token')
    this.poolId = this.route.snapshot.paramMap.get("id");
    this.getBlockCahinPool()  

   }

  ngOnInit(): void {
    this.nav.hide();
    this.accessSideNav.hide();
    this.isMobile();
  }

  ngOnDestroy() : void{
    this.nav.show();
    this.accessSideNav.show();
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  makeSubscriptions(){
    // var subsTransactions = this.poolService.getPoolTransactions(this.poolId).subscribe((data) => {
    //   console.log('makeSubscriptions, transanctions', data.pool.transactions)
    //   // this.transactions = data.pool.transactions
    // });
    
    // var subsPool = this.poolService.getPoolSummary( this.poolId).subscribe((pool) => {
    //   this.found = true
    //   console.log('makeSubscriptions, pool', pool, pool.totalVolume)
    //   this.pool = pool
    // })
    // this.subscriptions = [subsTransactions, subsPool]
    
    var depositSubs = this.poolInst.events.DepositReceived({
      fromBlock: 0
      })
      .on('data', data => { 
        console.log('recibi datos 1', data); 
        this.pool.income += Number(this.web3.utils.fromWei(data.returnValues.amount, 'ether'))
        this.transactions.push({value:this.web3.utils.fromWei(data.returnValues.currentTotal, 'ether'), date:dateFns.parseJSON(dateFns.fromUnixTime(data.returnValues.date))})
        this.getPoolTransactions()

      })
      .on('error', error => { console.log('recibi un error', error); });


    var distributionSubs = this.poolInst.events.EtherDistributionSent({
      fromBlock: 0
      })
      .on('data', data => { console.log('recibi datos 2', data); })
      .on('error', error => { console.log('recibi un error', error); });
    this.subscriptions = [depositSubs, distributionSubs]
  
    
  }

  goBack() {
    this.location.back();
  }

  getPoolTransactions (){
    console.log('[pool-dashboard] get pool transactions', this.transactions)
    this.sortingService.sort(this.transactions, 'date')
    this.transactions.reverse()
    this.lineChartdata = this.transactions.map(function(x){ return x.value})
    this.labels = this.transactions.map(function(x){  
      return dateFns.format(dateFns.parseJSON(x.date), 'dd MMM yyy').toString()
    })
  }

  async getBlockCahinPool(){
    console.log('Get web3 connection')
    await this.walletConnect.connectWallet(window).then((res)=>{
    }).catch((err)=>console.log(err))

    this.web3 = this.walletConnect.web3;
    this.poolInst = await this.poolInstMaker.createInstance(this.web3 ,this.poolId)

    const poolInst = this.poolInstMaker.createInstance(this.web3,this.poolId)
    var inputpool;
    await this.poolMethods.formatPool(poolInst, this.poolId, this.web3, this.user.address).then((res)=>{
      inputpool = res
      inputpool.totalVolume = this.web3.utils.fromWei(res.totalVolume, 'ether');
      inputpool.token = 'ETH'
      this.total+=Number(inputpool.totalVolume)
      this.pool = inputpool
    });
    var complement;
    await this.prepareTransactions().then((res)=>complement=res)
    inputpool = {...inputpool, ...complement}
    this.sortedParticipants = inputpool.participants

    this.prepareData()
    this.ready = true 

  }
  
  isMobile(){
    if(window.screen.availWidth<767){
      this.size=true;
    }else{
      this.size=false;
    }
  }

  prepareData(){
    this.total=this.pool.totalVolume
    this.poolData=this.sortedParticipants.map(function(x){ return x.percent})
    if (this.sortedParticipants.length > 5){
      this.others = this.sortedParticipants.slice(4,this.sortedParticipants.length)
      this.sortedParticipants = this.sortedParticipants.slice(0,4)
      this.totalOthers = this.others.reduce((acc, val) => acc += val.percent, 0)
    }
    this.insideTitle = (this.pool.percent*100).toString()+'%'
    var distribution = dateFns.parseJSON(dateFns.fromUnixTime(this.pool.nextDistribution))
    var diff = dateFns.formatDistanceToNowStrict(distribution)   

    this.indicatorsData = [
      {
        title: 'Total Income',
        value: this.pool.income,
        valueType: 'currency',
        currency: 'USD',
        diffValue: this.pool.incomeIncrease,
        diffValueType: 'percent',
        iconUrl: 'wallet',
        changeSymbol: this.pool.incomeIncrease >= 0 ? '+':'-',
      },
      {
        title: 'Token share',
        value: this.pool.percent,
        valueType: 'percent',
        currency: '',
        diffValue: '',
        diffValueType: 'integer',
        iconUrl: 'percent',
        changeSymbol: '',
      },
      {
        title: 'Token',
        value: this.pool.tokenSymbol,
        valueType: 'integer',
        currency: '',
        diffValue: '',
        diffValueType: 'integer',
        iconUrl: 'tag',
        changeSymbol: '',
      },
      {
        title: 'Next distribution',
        value: diff.split(' ')[0],
        valueType: 'integer',
        currency: '',
        diffValue: diff.split(' ')[1],
        diffValueType: 'integer',
        iconUrl: 'open-source',
        changeSymbol: '+',
      },
    ]
  }

  openDepositModal(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DepositDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        this.depositToPool(data)
      }
    );
  }

  async depositToPool(amount){
    await this.poolInst.methods.deposit().send({
      from: this.user.address,
      value: this.web3.utils.toWei(amount, 'ether'),
    }).then((res) => {
      const newTotal = parseInt(res.events.DepositReceived.returnValues.currentTotal, 10);
      this.pool.totalVolume = newTotal;
      this.pool = this.pool
      //this.transactions.push({value:newTotal, date:new Date()})
    });
    this.ngOnInit()
  }

  async chechDisitribution(){
    var amount = 0
    await this.poolInst.methods.currentAmount().call().then((res)=>{
      console.log('1.1',res)
      amount = res
    }).catch((err)=>console.log('1.2', err));

    await this.poolInst.methods.updateDistributionsAmounts(amount).send({
      from: this.user.address,
    }).then((res)=>{
      console.log('2.1', res)
    }).catch((err)=>console.log('2.2', err));

    await this.poolInst.methods.distribute().send({
      from: this.user.address,
    }).then((res)=>{
      console.log('3.1', res)
    }).catch((err)=>console.log('3.2', err));

    await this.poolInst.methods.updateNextDistribution().send({
      from: this.user.address,
    }).then((res)=>{
      console.log('4.1', res)
    }).catch((err)=>console.log('4.2', err));
  }

  async prepareTransactions(){
    // TODO: Agregar grafico de barras para entradas y salidas y que grafico de lineas grafique balance
    var res;
    await this.poolMethods.getEtherTransactions(this.poolInst, this.web3).then((res)=>{
      this.transactions = this.transactions.concat(res.transactions)
      res= res
      this.pool={...this.pool, ...res}
      this.getPoolTransactions()
      return res

      //ordenar transacciones por fechas
    });
    return res

  }

  openParticipants(){
    console.log('wii')
    this.showOthers = true
  }

  closeParticipants(){
    this.showOthers = false
  }

  CopyAddress(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    alert('Copied!')
    document.body.removeChild(selBox);
  }



}

// TODO: Al crear una pool, y redirigirlo hacia este componente, el boton "x" redirige a crear pool (debiese ir a dashboard)
