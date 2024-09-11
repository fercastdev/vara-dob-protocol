'use strict'

const poolService = require('../services/pool.service')
const _ = require('underscore')

// Utils
const utils = require('../utils/utils')

// Debug
const Debug = require('debug')
const debug = new Debug('backend:controller:pool')

const getPools = async (req, res) => {
    debug('get pools')
    const pools = await poolService.getPools(req, res)
}

const getPoolSummary = async (req, res) => {
    const poolAddress = req.params.address ? req.params.address : ''
    poolService.getPoolSummary(req, res, poolAddress)
}

const getPool = async (req, res) => {
    const poolAddress = req.params.address ? req.params.address : ''
    poolService.getPool(req, res, poolAddress)
}

const getPoolTransactions = async (req, res) => {
    const poolAddress = req.params.address ? req.params.address : ''
    poolService.getPoolTransactions(req, res, poolAddress)
}

const deposit = async (req, res) => {
    const poolAddress = req.params.address ? req.params.address : ''
    if (!req.body.value) {
        return res.status(400).json({
            ok: false,
            message: 'Empty body of value',
            err: 'Error saving deposit'
        })
    }
    poolService.deposit(req, res, req.body.value, poolAddress, req.body.date)
}

module.exports = {
    getPools,
    getPoolSummary,
    getPool,
    getPoolTransactions,
    deposit,
    // join
}