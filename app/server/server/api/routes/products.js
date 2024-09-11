const express = require('express')
const truckCtrl = require('../../controllers/truck.ctrl')

/**
 * Auth middleware.
 */
const { checkToken, checkAdminRole } = require('../middleware/auth')

const app = express()

/**
 * GET: Products by truck
 */
app.get('/api/v1/products/:truckId', truckCtrl.getTrucks)

module.exports = app