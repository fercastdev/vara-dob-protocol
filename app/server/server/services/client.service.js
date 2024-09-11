'use strict'

const Debug = require('debug')
const _ = require('underscore')
const { loadConfig } = require('../config/config')

// Models
const model = require('../models/index')

// Utils
const utils = require('../utils/utils')

// Mock data
const query = require('../queries/clients')

// Debug
const debug = new Debug('backend:service:client')

const fs = require('fs');

// Config
loadConfig()

/**
 * Get clients.
 */
const getClients = async (req, res, start, limit) => {
    debug('getting clients')
    return await query.getClients()
        .then((clients) => {
            res.json({
                ok: true,
                message: 'got clients successfully',
                numClients: clients.length,
                clients
            })
        })
        .catch((err) => {
            return res.status(400).json({
                ok: false,
                message: 'error with getting clients',
                err
            });
        });
}

const saveLocalClients = async (req, res, file, userId) => {
    fs.writeFile(`local_files/local_clients_${userId}.csv`, file[0].buffer, { encoding: 'ascii' }, (err) => {
        if (err) throw err;
        console.log('Save clients in local storage')
    });
    res.status(200).json({ status: 'ok' });
}

const getLocalClients = async (req, res, userId) => {
    console.log('Getting clients in localstorage')
    const csv = fs.readFileSync(`local_files/local_clients_${userId}.csv`);
    var array = csv.toString().split('\n');
    let result = [];
    let headers = array[0].split(',').map(item => item.trim());
    for (let i = 1; i < array.length; i++) {
        let obj = {};
        let line = array[i].split(',').map(item => item.trim());
        for (let j in headers) {
            obj[headers[j]] = line[j]
        }
        result.push(obj)
    }

    let json = JSON.stringify(result);
    // csv to jsnon finished
    res.type('.json')
    res.send(json);
}

module.exports = {
    getClients,
    saveLocalClients,
    getLocalClients,
}