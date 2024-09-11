const express = require("express");
const balanceCtrl = require("../../controllers/balance.ctrl");
const multer = require("multer");

/**
 * Auth middleware.
 */
const { checkToken, checkAdminRole } = require("../middleware/auth");

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * GET: balance
 */
app.get("/api/v1/balance", balanceCtrl.getBalance);

/**
 * GET: total income
 */
app.get("/api/v1/income", balanceCtrl.getTotalIncome);

/**
 * GET: distributions
 */
app.get("/api/v1/distributions", balanceCtrl.getDistributions);

/**
 * GET: transactions
 */
 app.get("/api/v1/transactions", balanceCtrl.getAllTransactions);

/**
 * GET: active pools
 */
 app.get("/api/v1/activePools", balanceCtrl.getActivePools);


module.exports = app;
