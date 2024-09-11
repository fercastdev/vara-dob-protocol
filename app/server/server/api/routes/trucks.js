const express = require("express");
const truckCtrl = require("../../controllers/truck.ctrl");
const multer = require("multer");

/**
 * Auth middleware.
 */
const { checkToken, checkAdminRole } = require("../middleware/auth");

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * POST: Save new file to local trucks
 */
app.post(
  "/api/v1/trucks/local/:userId",
  checkToken,
  upload.array("trucks", 1),
  truckCtrl.saveLocalTrucks
);

/**
 * GET: Get file from local trucks
 */
app.get("/api/v1/trucks/local/:userId", checkToken, truckCtrl.getLocalTrucks);

/**
 * GET: Trucks
 */
app.get("/api/v1/trucks", checkToken, truckCtrl.getTrucks);

/**
 * GET: Truck
 */
app.get(
  "/api/v1/trucks/:operationId",
  checkToken,
  truckCtrl.getTrucksByOperation
);

/**
 * GET: Truck details
 */
app.get(
  "/api/v1/trucks/:operationId/:truckId",
  checkToken,
  truckCtrl.getTruckByOperationByid
);

/**
 * POST: Create truck
 */
app.post("/api/v1/trucks", checkToken, truckCtrl.postCreateTruck);

/**
 * PUT: Update truck
 */
app.put("/api/v1/trucks/:id", checkToken, truckCtrl.updateTruck);

/**
 * DELETE: Delete truck
 */
app.delete("/api/v1/trucks/:id", checkToken, truckCtrl.hardDeleteTruck);

module.exports = app;
