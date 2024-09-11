const { POOLSSUMMARY } = require("../mock_data/poolsSummary")
const { POOLS } = require("../mock_data/pools")
const { TRANSACTIONS } = require("../mock_data/transactions")

const getBalance = async () => {
    var balance = 0
    var meanGrow = 0
    for (let trans of TRANSACTIONS){
        var address = trans.address
        var percent = POOLSSUMMARY.find((pool)=>pool.address===address).percent
        var totalVolumeUser = POOLSSUMMARY.find((pool)=>pool.address===address).totalVolume*percent
        var auxTrans = trans.transactions
        auxTrans.sort((a,b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0))

        var value = (auxTrans[0].value - auxTrans[1].value)/auxTrans[1].value
        balance += totalVolumeUser*value
        meanGrow += value


    }
    return {balance: balance, diff: meanGrow/POOLSSUMMARY.length}
}

const getTotalIncome = async () => {
    var income = 0
    var meanGrow = 0

    for (let trans of TRANSACTIONS){
        var address = trans.address
        var percent = POOLSSUMMARY.find((pool)=>pool.address===address).percent
        var totalVolumeUser = POOLSSUMMARY.find((pool)=>pool.address===address).totalVolume*percent
        var auxTrans = trans.transactions
        auxTrans.sort((a,b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0))

        var value = (auxTrans[0].value - auxTrans[1].value)/auxTrans[1].value
        var diffValue = (auxTrans[2].value - auxTrans[3].value)/auxTrans[3].value
        if (value>0){
            income += totalVolumeUser*value
            meanGrow += 1
        }
    }
    return {income: income, diff: meanGrow/POOLSSUMMARY.length}
}

const getDistributions = async () => {
    var auxPools = POOLSSUMMARY
    auxPools.sort((a,b) => (a.nextDistribution > b.nextDistribution) ? -1 : ((b.nextDistribution > a.nextDistribution) ? 1 : 0))
    var filteredPools = auxPools.slice(0,10).sort((a,b) => (a.nextDistribution > b.nextDistribution) ? 1 : ((b.nextDistribution > a.nextDistribution) ? -1 : 0))
    return filteredPools
}

const getAllTransactions = async () => {
    var auxTransactions = TRANSACTIONS.map(function(x){ return x.transactions })
    var orderedTransactions = auxTransactions.reduce(function( a,b ){ return a.concat(b) })
    orderedTransactions.sort((a,b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0))
    var filteredransactions = orderedTransactions.slice(0,100).sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
    return filteredransactions
}

const getActivePools = async () => {
    var auxPools = POOLS
    auxPools.sort((a,b) => (a.creationDate > b.creationDate) ? -1 : ((b.creationDate > a.creationDate) ? 1 : 0))
    var mockDate = auxPools[0].creationDate.slice(0, 7)
    var filteredPools = auxPools.filter((pool)=>pool.creationDate.slice(0,7)===mockDate)
    return { activePools: auxPools.length, diff: filteredPools.length/auxPools.length}
}

module.exports = {
    getBalance,
    getTotalIncome,
    getAllTransactions,
    getDistributions,
    getActivePools
}