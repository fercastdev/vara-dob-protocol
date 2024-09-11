"use strict";


const axios = require('axios');
const moment = require('moment');
const userService = require("../services/user.service");

// Debug
const Debug = require("debug");
const debug = new Debug("backend:service:operation");

// models
const model = require("../models/index");
const query = require("../queries/operation");

// utils
const utils = require("../utils/utils");
const _ = require("underscore");
const { nanoid } = require("nanoid");
const { exec } = require("child_process");
const {
  vehicleFields,
  clientFields,
  productFields,
  parseCSVToJson,
  parseJsonToBuffer,
} = require("../utils/csvUtils");

/**
 * Get operations
 */
const getOperations = async (req, res, start, limit) => {
  debug("get operations");
  // const userId = req.userId;
  const userId = req.appId; /* <- get operations from idApp instead of userId */
  return await query
    .getOperations(userId)
    .then((operations) => {
      res.json({
        ok: true,
        message: "get operations successfully",
        numOperations: operations.length,
        operations,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        ok: false,
        message: "error with getting operations",
        err,
      });
    });
};

/**
 * Get operation by id
 */
const getOperationById = async (req, res, opId) => {
  debug("get operation details");
  const userId = req.userId;
  return await query
    .getOperationDetails(opId, userId)
    .then((data) => {
      if (data[0].length === 0) {
        return res.status(400).json({
          ok: false,
          err: {
            message: `operation #${opId} does not exist`,
          },
        });
      }

      res.json({
        ok: true,
        message: `operation #${opId} exists`,
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        ok: false,
        message: "API error",
        err,
      });
    });
};

/**
 * Get operation routes
 */
const getOperationRoutes = async (req, res, opId) => {
  try {
    const userId = req.userId;
    const data = await query.getOperationRoutes(opId, userId);
    const status = await query.getOperationStatus(opId);
    if (!data[0][0]) {
      return res.status(400).json({
        ok: false,
        err: {
          message: `operation #${opId} does not exist`,
        },
      });
    }
    const { id, name, date } = data[0][0];
    const waypoints = query.getDirections(data[1]);
    const withPoints = await query.getGoogleDirections(waypoints);
    res.json({
      ok: true,
      status: status[0][0].status,
      data: {
        operation: { id, userId, name, date },
        trucks: [...withPoints],
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "API error",
      error,
    });
  }
};

/**
 * Create json operation
 */
const postCreateJsonOperation = async (req, res) => {
  console.log("postCreateJsonOperation")
  var version = 1;
  var error_message = "There was an error creating the operation";
  var process_model = true;

  try {
    const id = `O${nanoid(16)}`;
    const userId = req.userId;
    console.log("user ",userId);
    var { metadata, products, vehicles, clients } = req.body;
    var use_saved_csv_client = metadata.use_saved_csv_client;
    var use_saved_csv_truck = metadata.use_saved_csv_truck;

    if(use_saved_csv_client){
    	var file =`local_files/local_clients_${userId}.csv`
    	var clientsCSV = await parseCSVToJson(file);
    	error_message = "error with saved csv";
    	clients = [];
    	clientsCSV.forEach((client) => {
    		clients.push(
		        {
		            "name": client["CLIENTE"],
		            "rut": client["RUT"],
		            "address": client["DIRECCION"],
		            "lng": client["LONGITUD"],
		            "lat": client["LATITUD"],
		            "commune": client["COMUNA"],
		            "region": client["REGION"],
		            "waitTime": client["TIEMPO"],
		            "timeWindow": client["VENTANA_HORARIA"],
		            "codCluster": client["COD_CLUSTER"]
		        }
    		)
    	})
    }
    if(use_saved_csv_truck){
    	var file =`local_files/local_trucks_${userId}.csv`
    	var trucksCSV = await parseCSVToJson(file);
    	error_message = "error with saved csv";
    	//console.log(trucksCSV);
    	vehicles = [];
    	trucksCSV.forEach((truck) => {
    		vehicles.push(
		        {
		            "activate": truck["ACTIVAR"],
		            "plateNumber": truck["PATENTE"],
		            "rut": truck["RUT"],
		            "length": truck["LARGO"],
		            "width": truck["ANCHO"],
		            "height":truck["ALTO"],
		            "supportedWeight": truck["PESO_SOPORTA"],
		            "axes": truck["EJES"],
		            "type": truck["TIPO"],
		            "productType": truck["TIPO_PRODUCTO_ENTREGA"],
		            "openClosed": truck["ABIERTO_CERRADO"],
		            "dieselElectric": truck["DIESEL_ELECTRICO"],
		            "availability": truck["DISPONIBILIDAD"],
		            "cost": truck["COSTO"],
		            "costValue": truck["VALOR_COSTO"],
		            "maxAttendance": truck["CANTIDAD_MAXIMA_ATENCION"],
		            "backToOrigine": truck["VUELVE_ORIGEN"],
		            "hoursDisp": truck["HORAS_DISPONIBLES"],
		            "codCluster": truck["COD_CLUSTER"]
		        }
    		)
    	})
    }
	if(vehicles){
	       vehicles.forEach((vehicle) => {
	        (vehicle.activate === undefined) ? vehicle.activate = 'ACTIVO' : vehicle.activate;
	        (vehicle.rut === undefined) ? vehicle.rut = nanoid(8) : vehicle.rut;
	        (vehicle.length === undefined) ? vehicle.length = 3.5 : vehicle.length;
	        (vehicle.width === undefined) ? vehicle.width = 2 : vehicle.width;
	        (vehicle.height === undefined) ? vehicle.height = 2 : vehicle.height;
	        (vehicle.supportedWeight === undefined) ? vehicle.supportedWeight = 1000 : vehicle.supportedWeight;
	        (vehicle.axes === undefined) ? vehicle.axes = 1 : vehicle.axes;    
	        (vehicle.type === undefined) ? vehicle.type = 'CAMIONETA' : vehicle.type;
	        (vehicle.productType === undefined) ? vehicle.productType = 'TODO' : vehicle.productType;
	        (vehicle.openClosed === undefined) ? vehicle.openClosed = 'CERRADO' : vehicle.openClosed;
	        (vehicle.dieselElectric === undefined) ? vehicle.dieselElectric = 'DIESEL' : vehicle.dieselElectric;
	        (vehicle.availability === undefined) ? vehicle.availability = 'DISPONIBLE' : vehicle.availability;
	        (vehicle.cost === undefined) ? vehicle.cost = '$/DIA' : vehicle.cost;
	        (vehicle.costValue === undefined) ? vehicle.costValue = 120000 : vehicle.costValue;
	        (vehicle.maxAttendance === undefined) ? vehicle.maxAttendance = 30 : vehicle.maxAttendance;
	        (vehicle.backToOrigine === undefined) ? vehicle.backToOrigine = 'NO' : vehicle.backToOrigine;
	        (vehicle.hoursDisp === undefined) ? vehicle.hoursDisp = 8 : vehicle.hoursDisp;
	        (vehicle.codCluster === undefined) ? vehicle.codCluster = '' : vehicle.codCluster;
	      });
	}
    //console.log(vehicles);
    var products_finals;
	if (products){
           if(products.length == 0){
                  process_model = false;
                  res.json({
                      status: 404,
                      ok: false,
                      message: `Products are empty`,
                    });             
           };
		       products.forEach((product) => {
		        var client = clients.find((client) => client.rut === product.clientRut);
		        if (!client){
		        	error_message = "this client is not in the list of clients: "+product.clientRut;
		        }
		        product.origin = metadata.origin;
		        product.latOrigin = metadata.originLat;
		        product.lonOrigin = metadata.originLng;
		        product.originAddress = metadata.originAddress;
		        product.originCommune = metadata.originCommune;
		        product.clientAddress = client.address;
		        product.clientCommune = client.commune;
		        product.clientRegion = client.region;
				(product.quantity === undefined) ? product.quantity = 1 : product.quantity;
				(product.faces === undefined) ? product.faces = '*' : product.faces;
				(product.tol_x_min === undefined) ? product.tol_x_min = '*' : product.tol_x_min;
				(product.tol_x_max === undefined) ? product.tol_x_max = '*' : product.tol_x_max;
				(product.tol_y_min === undefined) ? product.tol_y_min = '*' : product.tol_y_min;
				(product.tol_y_max === undefined) ? product.tol_y_max = '*' : product.tol_y_max;
		      });   
		      products_finals = products;
	}
	else{
		    console.log("generate products_auto_generated");
		    var products_auto_generated = [];
		      clients.forEach((client) => {
		        var product = {};
		        product.clientName = client.name;
		        product.clientRut = client.rut;
		        product.clientAddress = client.address;
		        product.clientCommune = client.commune;
		        product.clientRegion = client.region;
		        product.origin = metadata.origin;
		        product.latOrigin = metadata.originLat;
		        product.lonOrigin = metadata.originLng;
		        product.originAddress = metadata.originAddress;
		        product.originCommune = metadata.originCommune;
		        product.priority = 1;
		        product.sku = `S${nanoid(8)}`;
		        product.quantity = 1;
		        product.length = 0.5;
		        product.width = 0.5;
		        product.height = 0.5;
		        product.weight = 10;
		        product.selfSupporting = "SI";
		        product.maxWeightSupported = 1000;
		        product.date = moment().format('MM/DD/YYYY');
		        product.faces = "*";
		        product.tol_x_min = "*";
		        product.tol_x_max = "*";
		        product.tol_y_min = "*";
		        product.tol_y_max = "*";

		        products_auto_generated.push(product);
		      });
		      products_finals = products_auto_generated;  
	};
 
   if (process_model){
    //console.log(products_finals);
    const files = await Promise.all([
      parseJsonToBuffer(products_finals, { fields: productFields }),
      parseJsonToBuffer(vehicles, { fields: vehicleFields }),
      parseJsonToBuffer(clients, { fields: clientFields }),
    ]);
    var name = metadata.name;
    var webhook = metadata.webhook;
    var status = "running";
    var erros = '';
    return await query
      .uploadOperation(id, files, userId, name)
      .then(() => {
        res.json({
          ok: true,
          message: `Operation created successfully`,
          id: id,
        });
      })
      .then(
      	//run_model_heuristic
        exec(`sudo ./run_model_heuristic.sh ${id} ${version}`,{maxBuffer: 1024 * 500 * 1000}, (error, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            erros = error;
            status = "fail";
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            erros = stderr;
            status = "fail";
          }
          //console.log(`stdout: ${stdout}`);
          status = "done";
          erros = '';

          console.log("sending to: ",webhook);
          console.log("whit response: ",response_object);
          var response_object = {id: id, status: status, comments: erros}
          axios.post(webhook, response_object)
              .then(res => {
                console.log(`statusCode: ${res.statusCode}`)
                //console.log(res)
              })
              .catch(error => {
                //console.error(error)
              })
        })
      );   
   }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error_message,
      error: error
    });
  }
};

/**
 * Create operation
 */
const postCreateOperation = async (req, res, files, version, opName = null) => {
  debug("create operation");
  const id = `O${nanoid(16)}`;
  const userId = req.userId;
  req.body.name = req.body.name === "" ? "operation" : req.body.name 
  const name = opName ? req.body.name + opName  : req.body.name;
  return await query
    .uploadOperation(id, files, userId, name)
    .then(() => {
      res.json({
        ok: true,
        message: `Operation ${id} created successfully`,
      });
    })
    .then(
      exec(`sudo ./run_model_heuristic.sh ${id} ${version}`, {maxBuffer: 1024 * 500 * 1000}, (error, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);

        var response_object = {};
        query.getOperationDetails(id, userId)
        .then((data) => {
            response_object = data;
            var url_dispatch = 'webhook';
            axios.post(url_dispatch, response_object)
            .then(res => {
                console.log(`statusCode: ${res.statusCode}`)
                //console.log(res)
            })
            .catch(error => {
                    //console.error(error)
            })   
        })
        .catch((err) => {
            console.log(err);
        });   
 
      })
    )
    .catch((err) => {
      return res.status(400).json({
        ok: false,
        message: "API error",
        err,
      });
    });
};

// /**
//  * Update operation
//  */
// const updateOperation = async(req, res, objOp, opId) => {
//     debug('update operation')
//     return await model.Operation.update(objOp, {
//         returning: true,
//         where: { id: opId }
//     })
//     .then(([rowsUpdate, [updatedOperation]]) => {
//         res.json({
//             ok: true,
//             message: `operation #${opid} updated successfully`,
//             operationUpdated: opId,
//             operation: updatedOperation
//         })
//     })
//     .catch((err) => {
//         return res.status(500).json({
//             ok: false,
//             message: 'API error',
//             err
//         })
//     })
// }

/**
 * Hard delete operation
 */
const hardDeleteOperation = async (req, res, opId) => {
  const userId = req.userId;
  debug("delete operation");
  return await query
    .deleteOperation(opId, userId)
    .then(() => {
      res.json({
        ok: true,
        message: "Operation deleted successfully",
        operation: opId,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        ok: false,
        message: "API error",
        err,
      });
    });
};

module.exports = {
  getOperations,
  getOperationById,
  getOperationRoutes,
  postCreateJsonOperation,
  postCreateOperation,
  hardDeleteOperation,
};
