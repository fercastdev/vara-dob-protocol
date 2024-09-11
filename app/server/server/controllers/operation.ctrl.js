"use strict";

const operationService = require("../services/operation.service");
const downloadService = require("../services/download.service");
const _ = require("underscore");

// Utils
const utils = require("../utils/utils");

const Debug = require("debug");
const { tempTruckCSV,tempClientCSV, clusterizeProducts } = require("../services/cluster.service");
//const { codePointAt } = require("core-js/core/string");
const debug = new Debug("backend:controller:operation");

/**
 * Get operations
 */
const getOperations = async (req, res) => {
  debug("get operations");
  const operations = await operationService.getOperations(req, res);
};

/**
 * Get operation by id
 */
const getOperationById = async (req, res) => {
  debug("get operation by id");
 
  const opId = req.params.id || null;
  
  if (opId) {
    const operation = await operationService.getOperationById(req, res, opId);
  }
};

/**
 * Get operation routes
 */
const getOperationRoutes = async (req, res) => {
  debug("get operation routes");
  const opId = req.params.id;

  if (opId) {
    const routes = await operationService.getOperationRoutes(req, res, opId);
  }
};

/**
 * Create json operation
 */
const postCreateJsonOperation = async (req, res) => {
  const operation = await operationService.postCreateJsonOperation(req, res);
};

/**
 * Create operation
 */
const postCreateOperation = async (req, res) => {
  const codes = req.body.codes ? req.body.codes.split(",") : null
  const version = req.body.version ? req.body.version : 1
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      message: "Empty body of operation",
    });
  }
  const files = req.files.map((file) => file.buffer);
  if (codes[0] !== 'undefined') {
    const clusterizedTrucks = await tempTruckCSV(files[1], codes)
    const clusterizedClients = await tempClientCSV(files[2], codes)
    //console.log(codes);
    //console.log(clusterizedClients);
    codes.forEach(async (cod, index) => {
      setTimeout(async function () {
        const clusterizedProducts = await clusterizeProducts(files[0], clusterizedClients[index]);
        const clusterFiles = [ Buffer.from(clusterizedProducts, 'utf-8'), Buffer.from(clusterizedTrucks[index], 'utf-8'), Buffer.from( clusterizedClients[index], 'utf-8') ]
        const operation = await operationService.postCreateOperation(req, res, clusterFiles, version, `_${cod}`);
        }, index * 40000);
    });
  }
  else {
    const operation = await operationService.postCreateOperation(req, res, files, version);
  }
};

// /**
//  * Update operation
//  */
// const updateOperation = async(req, res) => {
//     const opId = req.params.id || null
//     if(_.isEmpty(req.body)) {
//         return res.status(400).json({
//             ok: false,
//             message: 'Empty body of operation',
//             err: 'No data to update'
//         })
//     }

//     const operation = await operationService.updateOperation(req, res, req.body, opId)
// }

/**
 * Hard delete operation
 */
const hardDeleteOperation = async (req, res) => {
  const opId = req.params.id || null;
  if (opId) {
    const operation = await operationService.hardDeleteOperation(
      req,
      res,
      opId
    );
  }
};

/**
 * Definitor for operation
 */
const getDefinitorOperation = async (req, res) => {
  const opDef = await operationService.getDefinitorOperation(
    req,
    res,
    req.query.operation
  );
};

const getDownloadFiles = async (req, res) => {
  debug("get operation files by id");
  const opId = req.params.id || null;
  const name = req.params.name || null;
  
  if (opId) {
    const files = await downloadService.getOperationFiles(req, res, opId, name);
  }
};

module.exports = {
  getOperations,
  getOperationById,
  getOperationRoutes,
  postCreateOperation,
  postCreateJsonOperation,
  getDownloadFiles,
  // updateOperation,
  hardDeleteOperation,
  getDefinitorOperation,
};
