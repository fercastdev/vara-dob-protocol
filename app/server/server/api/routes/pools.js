const express = require("express");
const poolCtrl = require("../../controllers/pool.ctrl");
const multer = require("multer");

/**
 * Auth middleware.
 */
const { checkToken, checkAdminRole } = require("../middleware/auth");

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * GET: pools
 */
app.get("/api/v1/pools", poolCtrl.getPools);

/**
 * GET: Get pool summary from pools
 */
app.get("/api/v1/poolsummary/:address", poolCtrl.getPoolSummary);

/**
 * GET: Get pool summary from pools
 */
app.get("/api/v1/pool/:address", poolCtrl.getPool);

 /**
 * GET: Get pool summary from pools
 */
app.get("/api/v1/pool/transactions/:address", poolCtrl.getPoolTransactions);

/**
 * PUT: Update total volume of pool
 */
app.put("/api/v1/pool/deposit/:address", poolCtrl.deposit);

// /**
//  * PUT: Update participant of pool
//  */
// app.put("/api/v1/pools/join", poolCtrl.join
// );

module.exports = app;
