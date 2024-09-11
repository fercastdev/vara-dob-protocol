
export interface contractTypePool {
    name: string;
    description: string;
    poolAccess: string;
    distributionWay: string;
}

export interface basicAssetPool {
    name: string;
    BCType: string;
    tokenType: string;
    maxNumberToken: number;
}

export interface distributionRatio{
    address: string;
    percent: number;
}

export interface distributionFormPool {
    poolAccess:string;
    maxNumPeople: number;
    distributionWay: string;
    disitributionRatio: distributionRatio[];
    sameDistr: number;
}

export interface timePool {
    validity: number;
    validityUnit: string;
    firstDate: string;
    peridiocity: string;
    timeZone: string;
}

