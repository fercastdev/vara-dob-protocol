'use strict'

const Debug = require('debug')
const _ = require('underscore')
const { loadConfig } = require('../config/config')

// Models
const model = require('../models/index')

// Utils
const utils = require('../utils/utils')

// Mock data
const query = require('../queries/trucks')

// Debug
const debug = new Debug('backend:service:truck')

const { BigQuery } = require('@google-cloud/bigquery');


const options = {
    keyFilename: '../../keys/tetris4d-4b50dcaa9e77.json',
    projectId: 'tangential-sled-304912',
};

const fs = require('fs');

// Config
loadConfig()

/**
 * Get trucks by operation
 */
const getTrucksByOperation = async (req, res, operationId) => {
    console.log('getting trucks by operation')
    const query = `SELECT * FROM \`tangential-sled-304912.operations.trucks\` WHERE operationId = \'${operationId}\'`;
    const queryOptions = {
        query: query,
        location: 'US'
    };

    const bigqueryClient = new BigQuery(options);
    const [job] = await bigqueryClient.createQueryJob(queryOptions);
    const [rows] = await job.getQueryResults();
    console.log(rows);
    return res.send(rows);
}

/**
 * Get trucks from csv
 */
const getTrucks = async (req, res, start, limit) => {
    debug('getting trucks')
    return await query.getTrucks()
        .then((trucks) => {
            res.json({
                ok: true,
                message: 'got trucks successfully',
                numTrucks: trucks.length,
                trucks
            })
        })
        .catch((err) => {
            return res.status(400).json({
                ok: false,
                message: 'error with getting trucks',
                err
            });
        });

}

/**
 * Get truck by id
 */
const getTruckByOperationById = async (req, res, operationId, truckId) => {
    console.log('get truck by id by operation')
    const query = `SELECT * FROM \`tangential-sled-304912.operations.trucks\` WHERE operationId = ${operationId} AND id = ${truckId}`;
    const queryOptions = {
        query: query,
        location: 'US'
    };

    const bigqueryClient = new BigQuery(options);
    const [job] = await bigqueryClient.createQueryJob(queryOptions);
    const [rows] = await job.getQueryResults();
    console.log(rows);
    return res.send(rows);
}

/**
 * Create truck
 */
const createTruck = async (req, res, truck) => {
    debug('create truck')
    const query = `INSERT INTO \`tangential-sled-304912.operations.trucks\` (active, id, plateNumber, RUT, maxPayload, axes, type,
        available, productType, openClosed, dieselElectric, cost, xLen, yLen, zLen, operationId)
        VALUES (
            ${truck.active},
            ${truck.id},
            \'${truck.plateNumber}\',
            \'${truck.RUT}\',
            ${truck.maxPayload},
            ${truck.axes},
            \'${truck.type}\',
            ${truck.available},
            \'${truck.productType}\',
            \'${truck.openClosed}\',
            \'${truck.dieselElectric}\',
            \'${truck.cost}\',
            ${truck.xLen},
            ${truck.yLen},
            ${truck.zLen},
            ${truck.operationId}
        )`;
    const queryOptions = {
        query: query,
        location: 'US'
    };

    const bigqueryClient = new BigQuery(options);
    bigqueryClient.query(queryOptions).then(() => { res.send(truck); });
}

/**
 * Update truck
 */
const updateTruck = async (req, res, truck, truckId) => {
    debug('update truck')
    return await model.Truck.update(truck, {
        returning: true,
        where: { id: truckId }
    })
        .then(([rowsUpdate, [updatedTruck]]) => {
            res.json({
                ok: true,
                message: `Updated truck #${truckId} sucessfully`,
                truckUpdated: truckId,
                truck: updatedTruck
            })
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                message: 'API error',
                err
            })
        })
}

/**
 * Hard delete truck
 */
const hardDeleteTruck = async (req, res, truck) => {
    debug('delete truck')
    return await model.Truck.destroy(({ where: { id: truck } }))
        .then((truck) => {
            if (!truck) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Truck does not exist, can not delete!'
                    }
                })
            }

            res.json({
                ok: true,
                message: 'Truck deleted successfully',
                truck: truck
            })
        })
        .catch((err) => {
            return res.status(400).json({
                ok: false,
                message: 'API error',
                err
            })
        })
}

const saveLocalTrucks = async (req, res, file, id) => {
    fs.writeFile(`local_files/local_trucks_${id}.csv`, file[0].buffer, { encoding: 'ascii' }, (err) => {
        if (err) throw err;
        console.log('Save trucks in local storage')
    });
    res.status(200).json({ status: 'ok' });
}

const getLocalTrucks = async (req, res, userId) => {
    console.log('Getting trucks in  localstorage');
    // csv to JSON
    const csv = fs.readFileSync(`local_files/local_trucks_${userId}.csv`);
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

    // fs.readFile('local_files/local_trucks.csv',
    //     {encoding: 'utf-8'},
    //     (err, data) => {
    //         if (!err) {
    //             res.type('.csv')
    //             res.send(data);
    //         }
    // });
}
module.exports = {
    getTrucks,
    getTrucksByOperation,
    getTruckByOperationById,
    createTruck,
    updateTruck,
    hardDeleteTruck,
    saveLocalTrucks,
    getLocalTrucks,
}
