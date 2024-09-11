'use strict'

const Debug = require('debug')
const _ = require('underscore')
const { loadConfig } = require('../config/config')

// Models
const model = require('../models/index')

// Utils
const utils = require('../utils/utils')

// Mock data
const query = require('../queries/pools')

// Debug
const debug = new Debug('backend:service:pool')

const fs = require('fs');

// Config
loadConfig()

const getPools = async (req, res) => {
    debug('Fetching pool data')
    return await query.getPools()
    .then((pools) => {
        res.json({
            ok: true,
            message: 'got pools successfully',
            numPools: pools.length,
            pools
        })
    })
    .catch((err) => {
        return res.status(400).json({
            ok: false,
            message: 'error with getting pools',
            err
        });
    });
}

const getPoolSummary = async (req, res, poolAddress) => {
    debug('Fetching pool data')
    return await query.getPoolSummary(poolAddress)
    .then((pool) => {
        res.json({
            ok: true,
            message: `pool #${poolAddress} does exist`,
            pool
        })
    })
    .catch((err) => {
        return res.status(400).json({
            ok: false,
            message: `pool #${poolAddress} does not exist`,
            err
        });
    });
}

const getPool = async (req, res, poolAddress) => {
    debug('Fetching pool data')
    return await query.getPool(poolAddress)
    .then((pool) => {
        res.json({
            ok: true,
            message: `pool #${poolAddress} does exist`,
            pool
        })
    })
    .catch((err) => {
        return res.status(400).json({
            ok: false,
            message: `pool #${poolAddress} does not exist`,
            err
        });
    });
}

const getPoolTransactions = async (req, res, poolAddress) => {
    debug('Fetching transactions')
    return await query.getPoolTransactions(poolAddress)
    .then((pool) => {
        res.json({
            ok: true,
            message: 'got transactions successfully',
            numTransactions: pool.transactions.length,
            pool
        })
    })
    .catch((err) => {
        return res.status(400).json({
            ok: false,
            message: 'error with getting transactions',
            err
        });
    });
}

const deposit = async (req, res, value, poolAddress, date) => {
    debug('Transfering')
    return await query.deposit(poolAddress, value, date)
    .then((pool) => {
        res.json({
            ok: true,
            message: 'deposit successfully',
            pool
        })
    })
    .catch((err) => {
        return res.status(400).json({
            ok: false,
            message: 'error with deposit',
            err
        });
    });
}

// const join = async (req, res, file, address) => {
//     console.log('Joining')
// }

module.exports = {
    getPools,
    getPoolSummary,
    getPool,
    getPoolTransactions,
    deposit,
    // join
}