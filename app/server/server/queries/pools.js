const { POOLSSUMMARY } = require("../mock_data/poolsSummary")
const { POOLS } = require("../mock_data/pools")
const { TRANSACTIONS } = require("../mock_data/transactions")
var crypto = require("crypto");

const getPools = async () => {
  return POOLSSUMMARY;
};

const getPoolSummary = async ( address ) => {
  return POOLSSUMMARY.find(pool => pool.address === address)
}

const getPool = async ( address ) => {
  return POOLS.find(pool => pool.address === address)
}

const getPoolTransactions = async ( address ) => {
  return TRANSACTIONS.find(trans => trans.address === address )
}

const deposit = async ( address, value, date ) => {
  var indexp = POOLS.findIndex(pool => pool.address === address)
  var indexs = POOLSSUMMARY.findIndex(pool => pool.address === address)
  if (indexs !== -1 && indexp !== -1 ){
    POOLS[indexp].totalVolume += value
    POOLSSUMMARY[indexs].totalVolume += value
    var trans = TRANSACTIONS.find(tr => tr.address === address)
    var hash = crypto.randomBytes(32).toString('hex');
      const auxTrans = {
        'hash':hash, 
        "date": date,
        "value": value }
    if (trans !== undefined){
      var indext = TRANSACTIONS.indexOf(trans)
      TRANSACTIONS[indext].transactions.push(auxTrans)
    } else {
      TRANSACTIONS.push({address: address, transactions:[auxTrans]})
    }
    return POOLSSUMMARY[indexs]
  } else {
    return 'No pool found'
  }

}

// const join

module.exports = {
  getPools,
  getPoolSummary,
  getPool,
  getPoolTransactions,
  deposit
};