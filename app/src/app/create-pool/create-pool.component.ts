import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import timezones from 'timezones-list';
import * as dateFns from "date-fns";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OtherOptionDialogComponent } from './other-option-dialog/other-option-dialog.component';
import { PercentDialogComponent } from './percent-dialog/percent-dialog.component';
import { ISmartContractData,IUserDistr } from './smart-contract-data';
import { NavbarService } from 'app/services/navbar.service';
import { SidenavService } from 'app/services/sidenav.service';
import { CreatePoolService } from 'app/services/create-pool.service';
import { ActivatedRoute } from '@angular/router';
import { formPool } from 'app/shared/interfaces/formpool';
import { MetamaskConnectService } from 'app/blockchainUtils/metamask-connect.service';
import { PoolMasterInstanceService } from 'app/blockchainUtils/pool-master-instance.service';
import { PoolInstanceService } from 'app/blockchainUtils/pool-instance.service';

//Create pool component, multi-page form with which the user provides information for creating a smart contract. 
//Atributes to stablish: name of the pool (smart contract), blockchain type, token protocol type, max number of posible tokens in pool, 
//type of pool access (private or public) maximum number of people permitted in pool, the distribution way (distinctly or equally)
//disitribution ratio (list with participants and their repectives percentage or user with percent, same for everyone) .
//validity time of the smart contract, validity unit in which is measured the time, first date of distribution and peridiocity of distributions 

@Component({
  selector: 'app-create-pool',
  templateUrl: './create-pool.component.html',
  styleUrls: ['./create-pool.component.scss'],
  providers: [{ provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false }}]
})
export class CreatePoolComponent implements OnInit {
  user = {name:'this user', address:'0x000000000000000000000000000000000'}
  contractType: FormGroup; 
  basicAssetInfo: FormGroup;  
  distributionInfo: FormGroup; 
  TimeInfo: FormGroup;
  CheckInfo: FormGroup;
  public timezones = timezones
  private _creationInProgress = false;
  listOfDates: Date[] = []
  calculating: boolean = false;
  simDiscPercent: number = 0;
  individualPercent: number = 0;
  simLastDate: Date = new Date();
  otherPeriodOption: boolean = false;
  private _invalidMultipleDistr: boolean;
  private _distrWayAux: string = "";
  private _equalPercentInput:number=0;
  private _SCData = {} as ISmartContractData;
  participants: IUserDistr[] = [];
  toggleDistribution: boolean = false;
  peridiocityValue: string;
  creatingMsg: string;
  poolAddress: string;


  /* optionPeridiocity: boolean - ( 1: valid / 2: not valid to be selected in form )
    {
      optionPeridiocity[0] => "annually"
      optionPeridiocity[1] => "semiannually"
      optionPeridiocity[2] => "quarterly"
      optionPeridiocity[3] => "monthly"
      optionPeridiocity[4] => "weekly"
      optionPeridiocity[5] => "daily"
      optionPeridiocity[6] => "other"
    } */
  optionPeridiocity=[1,1,1,1,1,1,1]; //Se inicializan de forma valida

  minDate: Date;
  maxDate: Date;

  step=1;
  enablestep=1;

  draf: formPool;

  get creationInProgress(){
    return this._creationInProgress
  }

  set creationInProgress(value){
    this._creationInProgress = value
  }

  get invalidMultipleDistr(){
    return this._invalidMultipleDistr
  }

  set invalidMultipleDistr(val){
    this._invalidMultipleDistr=val
  }

  get equalPercentInput (){
    return this._equalPercentInput
  }

  set equalPercentInput (val){
    this._equalPercentInput=val
    
  }

  get SCData (){
    return this._SCData
  }

  set SCData (val){
    this._SCData=val
  }

  get distrWayAux(){
    return this._distrWayAux
  }

  set distrWayAux(val){
    this._distrWayAux=val
  }

  contractTypeOptions: object[] = [
    {name:"fixed", description:"Private, you know exactly who must be in it. You can set differente percent share", poolAccess:"private", distributionWay:"distinctly" },
    {name:"invitation", description:"Private, anyone with invitation can join, equal share for everyone", poolAccess:"private", distributionWay:"equally"},
    {name:"charity", description:"Public, open and anybody can join. Same share for everyone joined",poolAccess:"public", distributionWay:"equally"},
    {name:"business", description:"For comercial distribution", poolAccess:"private"},
    {name:"static", description:"Private, you know exactly who must be in it, same amount retrieved every time", poolAccess:"private"},
    {name:"custom", description:"Not recommended. Every parameter can be edited"}
  ]

  BCTypeOptions: any[] = [ "ethereum", "solana", "binance", "polygon", "tron", "neo", "eos", "waves" ]

  tokenTypeOptions: any[] = [ "ERC20", "ERC223" ]

  peridiocityOptions: object = {
    "annually": ["years", 1], 
    "semiannually": ["months", 6], 
    "quarterly": ["months", 3], 
    "monthly": ["months", 1], 
    "weekly": ["days", 7], 
    "daily": ["days", 1], 
    "other": ["", 0]}

  validityUnitOptions: any[] = ["years", "months", "days"]

  //Para usar snackbar incluir en constructor private snackBar: MatSnackBar,
  constructor ( 
    public nav: NavbarService, 
    public accessSideNav: SidenavService,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog, 
    private createPoolService: CreatePoolService, 
    private route:ActivatedRoute,
    private walletConnect: MetamaskConnectService,
    private poolMaster: PoolMasterInstanceService,
    private pool: PoolInstanceService
    ) {
      this.user.address = localStorage.getItem('token')
      
      this.basicAssetInfo = this._formBuilder.group({
        name: ['', Validators.required],
        BCType: ['', Validators.required],
        tokenType: ['', Validators.required],
        maxNumberToken: ['', 
            Validators.required,
          ],
      });
      this.distributionInfo = this._formBuilder.group({
        poolAccess: ['', Validators.required],
        maxNumPeople: ['', Validators.required],
        distributionWay: ['', Validators.required],
        disitributionRatio: [[{address: this.user.address, percent: 0}], Validators.required],
        sameDistr:[0, Validators.required]
      });
      this.TimeInfo = this._formBuilder.group({
        validity: ['', Validators.required],
        validityUnit: ['', Validators.required],
        firstDate: ['', Validators.required],
        peridiocity: ['', Validators.required],
        timeZone: ['', Validators.required],
      });    
      this.contractType = this._formBuilder.group({
        contractTypeCtrl: ['', Validators.required],
        
      });
      this.nav.hide();
      this.accessSideNav.hide();
   }

  ngOnInit(): void {
    this.getDraft()
    this.onChangePeridiocity()
    this.onChangeDisitribution()
    this.onFormEdit()
    this.distributionInfo.disable()
    this.TimeInfo.disable()
    this.onChangeValidity()
  }

  getDraft(){
    let id = this.route.snapshot.paramMap.get('id');
    if(id!='0'){
      this.step = +this.route.snapshot.paramMap.get('step')
      this.enablestep = this.step
      this.createPoolService.getDraft(id)
      .subscribe((pool: formPool )=>{
        console.log("pool", pool);
        if(pool!=null){
          this.draf = pool;
          
          let contract = {
            name: this.draf.contractTypeCtrl.name,
            description: this.draf.contractTypeCtrl.description,
            poolAccess: this.draf.contractTypeCtrl.poolAccess,
            distributionWay: this.draf.contractTypeCtrl.distributionWay 
          }
          
          
          this.contractType.setValue({
            'contractTypeCtrl':contract
          })
   
          this.basicAssetInfo.setValue({
            'name':this.draf.basicAsset.name,
            'BCType':this.draf.basicAsset.BCType,
            'tokenType':this.draf.basicAsset.tokenType,
            'maxNumberToken':this.draf.basicAsset.maxNumberToken
          })
  
          this.distributionInfo.setValue({
            'poolAccess':this.draf.distribution.poolAccess,
            'maxNumPeople':this.draf.distribution.maxNumPeople,
            'distributionWay':this.draf.distribution.distributionWay,
            'disitributionRatio':this.draf.distribution.disitributionRatio,
            'sameDistr':this.draf.distribution.sameDistr
          })
  
          this.TimeInfo.setValue({
            'validity':this.draf.time.validity,
            'validityUnit': this.draf.time.validityUnit,
            'firstDate':this.draf.time.firstDate,
            'peridiocity':this.draf.time.peridiocity,
            'timeZone':this.draf.time.timeZone
          })
  
        }
      });
    }
  }

  editStep(number: number){
    this.step=number;
  }

  ngOnDestroy() : void{
    this.nav.show();
    this.accessSideNav.show();
  }

  HandleOptionClick(value: string){
    if(value==="other"){
      this. openOptionDialog()
    }
  }

  onChangeValidity(){
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear, currentMonth, currentDay);
    

    this.TimeInfo.valueChanges.subscribe(val=>{
      if (this.TimeInfo.get('validityUnit').value === 'years'){
        console.log("years");
        if(this.TimeInfo.get('validity').value == 1){
          this.maxDate = new Date(currentYear+1, currentMonth, currentDay);
          this.optionPeridiocity=[0,1,1,1,1,1,1]
        }else{
          if(this.TimeInfo.get('validity').value > 1){
            this.maxDate = new Date(currentYear+this.TimeInfo.get('validity').value, currentMonth, currentDay);
            this.optionPeridiocity=[1,1,1,1,1,1,1]
          }
        }
      }else{
        if(this.TimeInfo.get('validityUnit').value === 'months'){
          console.log("months");
          if(this.TimeInfo.get('validity').value == 1){
            this.maxDate = new Date(currentYear, currentMonth+1, currentDay);
            this.optionPeridiocity=[0,0,0,0,1,1,1]
          }else{
            this.maxDate = new Date(currentYear, currentMonth+this.TimeInfo.get('validity').value, currentDay);
            if(this.TimeInfo.get('validity').value > 1 && this.TimeInfo.get('validity').value <= 3){
              this.optionPeridiocity=[0,0,0,1,1,1,1]
            }else{
              if(this.TimeInfo.get('validity').value > 3 && this.TimeInfo.get('validity').value <= 6){
                this.optionPeridiocity=[0,0,1,1,1,1,1]
              }else{
                if(this.TimeInfo.get('validity').value > 6){
                  this.optionPeridiocity=[0,1,1,1,1,1,1]
                  if(this.TimeInfo.get('validity').value > 12){
                    this.optionPeridiocity=[1,1,1,1,1,1,1]
                  }
                }
              }
            }
          }
        }else{
          if(this.TimeInfo.get('validityUnit').value === 'days'){
            console.log("days");
            if(this.TimeInfo.get('validity').value == 1 || this.TimeInfo.get('validity').value > 1 && this.TimeInfo.get('validity').value <= 7){
              if(this.TimeInfo.get('validity').value == 1){
                this.maxDate = new Date(currentYear, currentMonth, currentDay);
              }else{
                this.maxDate = new Date(currentYear, currentMonth, currentDay+this.TimeInfo.get('validity').value-1);
              }
              this.optionPeridiocity=[0,0,0,0,0,1,1]
            }else{
              if(this.TimeInfo.get('validity').value > 7){
                this.maxDate = new Date(currentYear, currentMonth, currentDay+this.TimeInfo.get('validity').value-1);
                this.optionPeridiocity=[0,0,0,0,1,1,1]
              }
            }
          }
        }
      }
    })
  }

  onChangeDisitribution(){
    this.distributionInfo.get('sameDistr').valueChanges.subscribe(val=>{
      if (this.distributionInfo.value.distributionWay === 'equally'){
        let auxUser= {} as IUserDistr
        auxUser.address=this.user.address
        auxUser.percent=val
        this.distributionInfo.get('disitributionRatio').setValue([auxUser])
        this.participants = [(auxUser)]
      }
    })
  }

  onChangePeridiocity(){
    this.TimeInfo.valueChanges.subscribe(val=>{
      if ( this.TimeInfo.valid ){
        this.createListOfDates()
        this.settingPercent()
        this.prepareData()
        this.peridiocityValue=this.TimeInfo.get('peridiocity').value
      }
    })
  }
  

  onFormEdit(){
    this.distributionInfo.valueChanges.subscribe(val=>{
      console.log("this changed", val)
      this.prepareData()
      this.settingPercent()
      if ( this.distributionInfo.valid ){
        this.TimeInfo.enable()
        this.step=4;
      }
      if (this.distributionInfo.value.distributionWay === 'equally'){
        this.distrWayAux=this.distributionInfo.value.distributionWay
      }else{
        this.distrWayAux=this.distributionInfo.value.distributionWay
      }
    })
    this.basicAssetInfo.valueChanges.subscribe(val=>{
      this.prepareData()
      this.settingPercent()
      if ( this.basicAssetInfo.valid ){
        this.distributionInfo.enable()
        this.step=3;
      }
    })
  }

  openOptionDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(OtherOptionDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        this.TimeInfo.get('peridiocity').setValue(data)
        this.otherPeriodOption = true
        this.peridiocityOptions['other'] = [data.split(',')[0], data.split(',')[1]]
      }
    );

    
  }

  openPercentDistDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height='50rem'
    dialogConfig.width='70rem'
    dialogConfig.data ={user: this.user}
    const dialogRef = this.dialog.open(PercentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        this.participants=data
        console.log("data",this.participants)
        this.checkDialogData(data)
        this.distributionInfo.get('disitributionRatio').setValue(data)
        this.distributionInfo.get('sameDistr').setValue(0)
        this.toggleDistribution=true;
      }
    ); 
  }

  checkDialogData(data: any){
    var total = data.map(function(x){return x.percent}).reduce((total: number, arg: number)=>total+arg)
    if (total === 100){
      this.distributionInfo.get('maxNumPeople').setValue(data.length)
      console.log("eurecka", data.length)
    } 
  }

  settingPercent(){
    if(this.distributionInfo.value.distributionWay==="equally"){
      this.simDiscPercent=this.distributionInfo.value.maxNumPeople * this.distributionInfo.value.disitributionRatio[0].percent/100
      this.individualPercent=this.distributionInfo.value.disitributionRatio[0].percent/100

    }
    else if (this.distributionInfo.value.distributionWay==="distinctly"){
      let participantsPercent = this.participants.map((function(x){return x.percent}))
      console.log('participantsPercent', participantsPercent)
      this.simDiscPercent = Object.values(participantsPercent).reduce((total,arg)=>total + arg, 0)/100
      this.individualPercent=participantsPercent[0]/100
    }
  }  

  maxEqualShare(){
    if (this.distributionInfo.get('maxNumPeople').valid){
      return 100/this.distributionInfo.value.maxNumPeople
    } else {
      return 100
    }
  }

  selectContractType(item: object){
    this.contractType.get('contractTypeCtrl').setValue(item)
    var param = Object.keys(item)
    var charac = Object.keys(this.distributionInfo.controls)
    for (let par of param){      
      if (charac.includes(par)){
        try{
        this.distributionInfo.get(par).setValue(item[par])          
        } catch(err){
          console.error(err)
        }
      }
      if(par === "distributionWay"){
        this.distrWayAux=item[par]
      } 
    }
  }
  nextDistFunc (periodUnit :string, periodAmount: number, firstDistrDate: Date){
    let nextDate : Date
    switch(periodUnit){
      case "years":
        nextDate = dateFns.add(firstDistrDate,{ years : periodAmount })
        break;
      case "months":
        nextDate = dateFns.add(firstDistrDate,{ months : periodAmount })
        break;
      case "days":
        nextDate = dateFns.add(firstDistrDate,{ days : periodAmount })
        break;
    }
    return nextDate
  }
  createListOfDates(){
    let iterations:number = this.TimeInfo.value.validity
    let itUnit = this.TimeInfo.value.validityUnit
    let firstDistrDate = this.TimeInfo.value.firstDate
    let periodAmount = this.TimeInfo.value.peridiocity.split(",")[1]
    let periodUnit = this.TimeInfo.value.peridiocity.split(",")[0]
    let nextDate : Date
    let lastDate: Date
    if (itUnit==="years"){
      lastDate = dateFns.add(Date.now(),{ years : iterations })
    } else if (itUnit==="months"){
      lastDate = dateFns.add(Date.now(),{ months : iterations })
    } else if (itUnit==="days"){
      lastDate = dateFns.add(Date.now(),{ days : iterations })
    }
    this.simLastDate=lastDate
    nextDate = firstDistrDate
    while (nextDate<lastDate){
      this.listOfDates.push(nextDate)
      nextDate = this.nextDistFunc(periodUnit, periodAmount, nextDate)
    }
    this.listOfDates.push(lastDate)
    if (this.listOfDates.length<=1){
      this.TimeInfo.setErrors({'invalidTimeDistributions':true})
    }
  }

  viewControl(stepclick: number): void{
    this.step=stepclick;
    if(stepclick==5){
      window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    }
  }

  prepareData(){
    var paramsBasicInfo = Object.keys(this.basicAssetInfo.controls)
    var paramsDistr = Object.keys(this.distributionInfo.controls)
    var paramsTime = Object.keys(this.TimeInfo.controls)
    var aux ={} as ISmartContractData
    for (let param of paramsBasicInfo){
      aux[param] = this.basicAssetInfo.value[param]
    }
    for (let param of paramsDistr){
        aux[param] = this.distributionInfo.value[param]
    }
    for (let param of paramsTime){
      aux[param] = this.TimeInfo.value[param]
    }
    this.SCData=aux
  }


  async startPool(){
    this.creationInProgress = true
    this.creatingMsg = 'Creating pool'

    this.viewControl(6)
    // Step 1: create a pool
    var lastDate = this.listOfDates[this.listOfDates.length-1]
    const durationInDays = dateFns.differenceInDays(lastDate, Date.now())
    var newPool = {
      name:this.basicAssetInfo.get('name').value,
      durationInDays:durationInDays,
      nextDistribution:dateFns.getUnixTime(this.TimeInfo.get('firstDate').value),
      distributionDates:[],
      numParticipants:this.distributionInfo.get('maxNumPeople').value,
      tokenSymbol:this.basicAssetInfo.get('tokenType').value,
      tokenInitialPercent:this.basicAssetInfo.get('maxNumberToken').value,
      publicAccess:this.distributionInfo.get('poolAccess').value === 'private'? false : true
    } 
    for(let day of this.listOfDates.slice(1,)){
      newPool.distributionDates.push(dateFns.getUnixTime(day))
    }

    console.log(newPool)
    var web3;
    var poolMasterInst
    await this.walletConnect.connectWallet(window).then((res)=>{
      web3 = res
      console.log('...', web3)
    }).catch((err)=>console.log(err))

    web3 = this.walletConnect.web3;
    console.log('---->',web3)

    poolMasterInst = this.poolMaster.createInstance(web3);
    console.log('poolMasterInst', poolMasterInst)

    var poolAddress = ''

    const receipt = await poolMasterInst.methods.createPool(
      newPool.name,
      newPool.durationInDays,
      newPool.nextDistribution,
      newPool.distributionDates,
      newPool.numParticipants,
      newPool.tokenSymbol,
      newPool.tokenInitialPercent,
      newPool.publicAccess
    ).send({
      from: this.user.address,
    }).then((res) => {
      console.log(res)
      console.log('res.to',res.to)
      console.log('res.events',res.events)
      poolAddress =res.events.CreatePool.returnValues.contractAddress
      this.poolAddress = poolAddress
      console.log('poolAddress', poolAddress)
      const poolInfo = {contract:res.to, isLoading: false, totalVolume : 0, currentState : 0, };
    }).catch((err)=>{
      console.log(err)
    });

    console.log('receipt', receipt)

    //Step 2: ASign participations tokens to participants
    if (this.distributionInfo.get('distributionWay').value==='distinctly'){

      var poolInst = await this.pool.createInstance(web3, poolAddress)
      console.log('poolInst', poolInst)
      this.creatingMsg = 'Asigning participations'

      console.log('entree', this.participants)
      for (let participant of this.participants){
        console.log(participant.address, participant.percent)
        await poolInst.methods.joinToPool(participant.address, participant.percent).send({
          from: this.user.address,
        }).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        });
      }

      // Step 3: distribute tokens
      this.creatingMsg = 'Distributing tokens'
      await poolInst.methods.doFirstTokenDistribution().send({
        from: this.user.address,
      }).then((res)=>{
        console.log('distribute tokens', res)
      }).catch((err)=>{
        alert(err)
      });
      this.creationInProgress = false



    } else {
      this.creationInProgress = false
    }

  }


}
