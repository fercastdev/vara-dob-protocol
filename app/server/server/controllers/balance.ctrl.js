'use strict'

const balanceService = require('../services/balance.service')
const _ = require('underscore')

// Utils
const utils = require('../utils/utils')

// Debug
const Debug = require('debug')
const debug = new Debug('backend:controller:balance')

const getBalance = async (req, res) => {
    debug('Fetching balance')
    balanceService.getBalance(req, res)
}

const getTotalIncome = async (req, res) => {
    debug('Fetching income')
    balanceService.getTotalIncome(req, res)
}

const getDistributions = async (req, res) => {
    debug('Fetching distributions')
    const distributions = await balanceService.getDistributions(req, res)
}

const getAllTransactions = async (req, res) => {
    debug('Fetching transactions')
    const distributions = await balanceService.getAllTransactions(req, res)
}

const getActivePools = async (req, res) => {
    debug('Fetching active pools')
    balanceService.getActivePools(req, res)
}


module.exports = {
    getBalance,
    getTotalIncome,
    getDistributions,
    getAllTransactions,
    getActivePools
}