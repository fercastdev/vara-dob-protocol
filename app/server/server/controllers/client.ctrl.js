'use strict'

const clientService = require('../services/client.service')
const _ = require('underscore')

// Utils
const utils = require('../utils/utils')

// Debug
const Debug = require('debug')
const debug = new Debug('backend:controller:client')

/**
 * Get cleints
 */
const getClients = async(req, res) => {
    debug('get clients')
    const clients = await clientService.getClients(req, res);
}

const getLocalClients = async (req, res) => {
  const userId = req.params.userId ? req.params.userId : ''
  clientService.getLocalClients(req, res, userId)
}
const saveLocalClients = async (req, res) => {
  const userId = req.params.userId ? req.params.userId : ''
  console.log('Saving clients in local (ctrl)');
  if (!req.files) {
      return res.status(400).json({
          ok: false,
          message: 'Empty body of client',
          err: 'Error saving clients'
      })
  }
  clientService.saveLocalClients(req, res, req.files, userId)
}

module.exports = {
  getClients,
  getLocalClients,
  saveLocalClients,
}