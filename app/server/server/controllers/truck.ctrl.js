'use strict'

const truckService = require('../services/truck.service')
const _ = require('underscore')

// Utils
const utils = require('../utils/utils')

// Debug
const Debug = require('debug')
const debug = new Debug('backend:controller:truck')

/**
 * Get trucks
 */
 const getTrucks = async(req, res) => {
    debug('get trucks')
    const trucks = await truckService.getTrucks(req, res);
}

/**
 * Get truck
 */
const getTrucksByOperation = async(req, res) => {
    debug('get truck')
    const operationId = req.params.operationId ? req.params.operationId : null
    const truck = await truckService.getTrucksByOperation(req, res, operationId )
}

/**
 * Get trucks definitor
 */
const getDefinitorTruck = async(req, res) => {
    debug('get definitor')
}

/**
 * Get truck by id
 */
const getTruckByOperationByid = async(req, res) => {
    const operationId = req.params.operationId ? req.params.operationId : null
    const truckId = req.params.truckId ? req.params.truckId : null
    if (truckId) {
        const truck = await truckService.getTruckByOperationById(req, res, operationId, truckId)
    }
}

/**
 * Create truck
 */
const postCreateTruck = async(req, res) => {
    if (_.isEmpty(req.body)) {
        return res.status(400).json({
            ok: false,
            message: `Empty body of Truck`,
            err: `creation truck error`
        })
    }
    const truck = await truckService.createTruck(req, res, req.body)
}

/**
 * Update truck
 */
const updateTruck = async(req, res) => {
    let id = req.params.id ? req.params.id : null
    if (_.isEmpty(req.body)) {
        return res.status(400).json({
            ok: false,
            message: `Empty body of truck`,
            err: `no info for update`
        })
    }
    const truckUpd = await truckService.updateTruck(req, res, req.body, id)
}

/**
 * Delete truck
 */
const hardDeleteTruck = async(req, res) => {
    const truckId = req.params.id ? req.params.id : null
    if (truckId) {
        const truck = await truckService.hardDeleteTruck(req, res, truckId)
    }
}

const getLocalTrucks = async (req, res) => {
    const userId = req.params.userId ? req.params.userId : ''
    truckService.getLocalTrucks(req, res, userId)
}

const saveLocalTrucks = async (req, res) => {
    const userId = req.params.userId ? req.params.userId : ''
    console.log('Saving trucks in local (ctrl)');
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'Empty body of truck',
            err: 'Error saving trucks'
        })
    }
    truckService.saveLocalTrucks(req, res, req.files, userId)
}

module.exports = {
    getTrucks,
    getTrucksByOperation,
    getTruckByOperationByid,
    postCreateTruck,
    updateTruck,
    hardDeleteTruck,
    getLocalTrucks,
    saveLocalTrucks,
}