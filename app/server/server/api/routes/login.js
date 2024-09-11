const express = require("express");
const authenticationCtrl = require("../../controllers/authentication.ctrl");

const app = express();

/**
 * POST: Login
 */
app.post("/api/v1/login", authenticationCtrl.postLogin);

/**
 * POST: Recover password
 */
app.post("/api/v1/recoverPass", authenticationCtrl.postRecoverPassword);

/**
 * POST: Signup
 */
 app.post("/api/v1/signup", authenticationCtrl.postSignup);

module.exports = app;
