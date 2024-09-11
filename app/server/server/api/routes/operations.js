const express = require("express");
const operationCtrl = require("../../controllers/operation.ctrl");
const multer = require("multer");

/**
 * Auth middleware
 */
const { checkToken, checkAdminRole } = require("../middleware/auth");

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * GET: Operation Files
 */
app.get("/api/v1/operations/files/:id/:name", checkToken, operationCtrl.getDownloadFiles);

/**
 * GET: Operations
 */
app.get("/api/v1/operations", checkToken, operationCtrl.getOperations);

/**
 * GET: Operation details
 */
app.get("/api/v1/operations/:id", checkToken, operationCtrl.getOperationById);

/**
 * GET: Operation routes
 */
app.get(
  "/api/v1/operations/:id/routes",
  checkToken,
  operationCtrl.getOperationRoutes
);

/**
 * POST: Create operation from json
 */
app.post(
  "/api/v1/operations/json",
  checkToken,
  operationCtrl.postCreateJsonOperation
);

/**
 * POST: Create operation
 */
app.post(
  "/api/v1/operations",
  checkToken,
  upload.array("operation", 3),
  operationCtrl.postCreateOperation
);

/**
 * DELETE: Delete operation
 */
app.delete(
  "/api/v1/operations/:id",
  checkToken,
  operationCtrl.hardDeleteOperation
);


module.exports = app;
