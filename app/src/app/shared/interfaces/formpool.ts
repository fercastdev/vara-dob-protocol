import { contractTypePool, basicAssetPool, distributionFormPool, timePool } from './stepPool';

export interface formPool {
    address: string;
    idpool: number;
    date: string;
    step: number;
    contractTypeCtrl: contractTypePool;
    basicAsset: basicAssetPool;
    distribution: distributionFormPool;
    time: timePool;
}
