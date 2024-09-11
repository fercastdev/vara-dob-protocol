'use strict'

const Debug = require('debug')
const _ = require('underscore')
const { loadConfig } = require('../config/config')
const parse_csv = require('csv-parse');

// Models
const model = require('../models/index')

// Utils
const utils = require('../utils/utils')

// Mock data
const query = require('../queries/clients')

// Debug
const debug = new Debug('backend:service:cluster')

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

const saveLocalClusters = async (req, res, file, userId) => {
    fs.writeFile(`local_files/local_clusters_${userId}.csv`, file[0].buffer, { encoding: 'ascii' }, (err) => {
        if (err) throw err;
        console.log('Save clusters in local storage')
        console.log(typeof file[0]);
        console.log(file[0]);
    });
    res.status(200).json({ status: 'ok' });
}

const getLocalClusters = async (req, res, userId) => {
    console.log('Getting clusters in localstorage')
    const csv = fs.readFileSync(`local_files/local_clusters_${userId}.csv`);
    var array = csv.toString().split('\n');
    console.log(array);
    let result = [];
    let headers = array[0].split(',').map(item => item.trim());
    console.log(headers);
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

const divideCSV = async (id = 1) => {
    console.log('holi');
	var CSVFile = `local_files/local_clusters_${id}.csv`;
	var csvData=[];
    var csvs = []
	var finishStream = false;
	fs.createReadStream(CSVFile)
	    .pipe(parse_csv({delimiter: ','}))
	    .on('data', function(csvrow) {
	        csvData.push(csvrow);        
	    });
    csvData.forEach((row, index) => {
        row[1]
    })

}

const tempCSV = async (data, clusters = null) => {
    let clusterizedCSVs = []
    let csvString = data.toString()
    const rows = csvString.split("\n")
    if (clusters){
        clusters.forEach((cod) => {
            let clust = []
            clust.push(rows[0])
            rows.forEach((row) => {
                let columns = row.split(",")
                if (columns[columns.length - 1].split("\r")[0] == cod){
                    clust.push(row);
                }
            })
            clusterizedCSVs.push(clust.join("\n"))
        })
    }
    return clusterizedCSVs
}

const clusterizeProducts = async (products, Clusteredclients) => {
    let productsRows = products.toString().split("\n")
    let clientRows = Clusteredclients.split("\n")
    let clusterizedProducts = []
    clientRows.forEach((row) => {
        let columns = row.split(",")
        let rut = columns[1]
        let filteredRows = productsRows.filter((prow) => prow.split(",")[0] == rut)
        clusterizedProducts = clusterizedProducts.concat(filteredRows)
    })
    return clusterizedProducts.join("\n")
}


module.exports = {
    getClients,
    saveLocalClusters,
    getLocalClusters,
    divideCSV,
    tempCSV,
    clusterizeProducts
}