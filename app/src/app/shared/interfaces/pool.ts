import { Participant } from "./participant"

export interface Pool {
    name : string, 
    address : string, 
    totalVolume : number, 
    maxCommission : number, 
    BCtype : string, 
    maxTotalToken : number, 
    creatorAddress : string, 
    percent : number, 
    maxNumParticipants : number, 
    participants: Participant[], 
    tokenType: string, 
    token: string,
    creationDate : string, 
    periodicity : string, 
    distributionDate : string, 
    lastDistribution : string, 
    distributionDates : string[]
}
