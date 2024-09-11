const express = require("express");
const clientCtrl = require("../../controllers/client.ctrl");
const multer = require("multer");

/**
 * Auth middleware.
 */
const { checkToken, checkAdminRole } = require("../middleware/auth");

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * POST: Save new file to local clients
 */
app.post(
  "/api/v1/clients/local/:userId",
  checkToken,
  upload.array("clients", 1),
  clientCtrl.saveLocalClients
);

/**
 * GET: Get file from local clients
 */
app.get("/api/v1/clients/local/:userId", checkToken, clientCtrl.getLocalClients);

/**
 * GET: Clients
 */
app.get("/api/v1/clients", checkToken, clientCtrl.getClients);

module.exports = app;
