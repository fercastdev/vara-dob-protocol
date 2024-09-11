"use strict";

const jwt = require("jsonwebtoken");

const authenticationService = require("../services/authentication.service");
const utils = require("../utils/utils");

const Debug = require("debug");
const debug = new Debug("backend:controller:authentication");

const postLogin = async (req, res) => {
  const userData = req.body;
  const user = await authenticationService.login(req, res, userData);
};

const postRecoverPassword = async (req, res) => {
  const userData = req.body;
  const userRecover = await authenticationService.recoveryPassword(
    req,
    res,
    userData
  );
};

// Controllers for psql user model

/**
 * Create user
 */
 const postSignup = async (req, res) => {
  debug("create user");
  const user = await authenticationService.signup(req, res);
};


module.exports = {
  postLogin,
  postRecoverPassword,
  postSignup,
};
