export interface IIndicatorData {
    title: string; //Title of indicator card
    value: number; //Main value to show
    valueType: string; //currency or integer 
    currency: string; //string of currency type ('USD) or empty 
    diffValue: any; //Can be used for differential value or unit 
    diffValueType: string; //'percent' or 'integer'
    iconUrl: string; //icon url
    changeSymbol: string; //if differential value is positive '+', else '-', or ''
}
