export interface ISmartContractData {
    name:string,
    BCType: string,
    tokenType:string,
    maxNumberToken:number,
    poolAccess:string,
    maxNumPeople:number,
    distributionWay:string,
    disitributionRatio:any[],
    validity:number,
    validityUnit:string,
    peridiocity:string,
    firstDate:Date,
    timeZone:string
  }

export interface IUserDistr{
  address: string;
  percent: number;
}
