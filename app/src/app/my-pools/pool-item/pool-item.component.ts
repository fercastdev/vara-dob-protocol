import { Component, OnInit, Input } from '@angular/core';
import * as dateFns from "date-fns";
import { MetamaskConnectService } from 'app/blockchainUtils/metamask-connect.service';


@Component({
  selector: 'app-pool-item',
  templateUrl: './pool-item.component.html',
  styleUrls: ['./pool-item.component.scss']
})

//Pool item component is the card visualization of one pool with a donut chart

export class PoolItemComponent implements OnInit {

  private web3;
  private _poolData: any

  get poolData (){
    return this._poolData
  }; 

  @Input() set poolData (val){
    this._poolData=val
    this.connectWeb3()
  }


  title: string = ""
  diffValue: string = '+70%';
  data: number[] = [5,1,3,4,9]
  insideTitle = ''
  showIcon = true
  total=0

  constructor( private walletConnect: MetamaskConnectService) { }

  ngOnInit(): void {
  }

  async connectWeb3(){
    await this.walletConnect.connectWallet(window).then((res)=>{
    }).catch((err)=>console.log(err))

    var newPools = 0 //En las ultimas 5 horas

    this.web3 = this.walletConnect.web3;

    this.transformData()
  }

  transformData(){
    console.log('[pool-item.component]', this.poolData)
    var distribution = dateFns.parseJSON(dateFns.fromUnixTime(this.poolData.nextDistribution))
    var diff = dateFns.formatDistanceToNowStrict(distribution)
    this.total=this.web3.utils.fromWei(this.poolData.totalVolume, 'ether');
    console.log('---------------->', this.total, this.web3)
    if (diff.split(' ')[1] === 'days' || diff.split(' ')[1] === 'hours' && parseFloat(diff.split(' ')[0]) < 7){
      this.title='Close to distribution'
    } else {
      this.title='Active'
    }

    this.insideTitle = (this.chechUserPercent()*100).toString()+'%'
    var aux = this.poolData.participants.map(function(x){ return x.percent})
    aux.sort()
    
  }

  chechUserPercent (): number {
    return this.poolData.percent
  }
}

// TODO: transform value from token into dolar
