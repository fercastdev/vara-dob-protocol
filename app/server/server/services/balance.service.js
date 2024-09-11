'use strict'

const Debug = require('debug')
const _ = require('underscore')
const { loadConfig } = require('../config/config')

// Models
const model = require('../models/index')

// Utils
const utils = require('../utils/utils')

// Mock data
const query = require('../queries/balance')

// Debug
const debug = new Debug('backend:service:balance')

const fs = require('fs');

// Config
loadConfig()

const getBalance = async (req, res) => {
    debug('Fetching balance')
    return await query.getBalance()
    .then((data) => {
        res.json({
            ok: true,
            message: 'got balance successfully',
            balance: data.balance,
            differential: data.diff
        })
    })
    .catch((err) => {
        return res.status(400).json({
            ok: false,
            message: 'error with getting balance',
            err
        });
    });
}

const getTotalIncome = async (req, res) => {
    debug('Fetching income')
    return await query.getTotalIncome()
    .then((data) => {
        res.json({
            ok: true,
            message: 'got income successfully',
            income: data.income,
            differential: data.diff
        })
    })
    .catch((err) => {
        return res.status(400).json({
            ok: false,
            message: 'error with getting income',
            err
        });
    });
}

const getDistributions = async (req, res) => {
    debug('Fetching distributions')
    return await query.getDistributions()
    .then((distributions) => {
        res.json({
            ok: true,
            message: 'got distributions successfully',
            numDistributions: distributions.length,
            distributions
        })
    })
    .catch((err) => {
        return res.status(400).json({
            ok: false,
            message: 'error with getting distributions',
            err
        });
    });
}

const getAllTransactions = async (req, res) => {
    debug('Fetching transactions')
    return await query.getAllTransactions()
    .then((transactions) => {
        res.json({
            ok: true,
            message: 'got distributions successfully',
            numTransactions: transactions.length,
            transactions
        })
    })
    .catch((err) => {
        return res.status(400).json({
            ok: false,
            message: 'error with getting distributions',
            err
        });
    });
}

const getActivePools = async (req, res) => {
    debug('Fetching pool data')
    return await query.getActivePools()
    .then((data) => {
        res.json({
            ok: true,
            message: 'got active pools successfully',
            numPools: data.activePools,
            differential: data.diff
        })
    })
    .catch((err) => {
        return res.status(400).json({
            ok: false,
            message: 'error with getting active pools',
            err
        });
    });
}


module.exports = {
    getBalance,
    getTotalIncome,
    getDistributions,
    getAllTransactions,
    getActivePools
}