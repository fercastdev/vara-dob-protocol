import { Participant } from "./participant"

export interface PoolSummary {
    id: number, 
    name: string ,
    address: string,
    TotalVolume: number, 
    percent: number,
    token: string, 
    nextDistribution: string,
    participants: Participant[] 
}
