"use strict";

const Debug = require("debug");
const jwt = require("jsonwebtoken");
const _ = require("underscore");
const nodeMailer = require("nodemailer");
const { loadConfig } = require("../config/config");
const { USERS } = require("../mock_data/users");

// models
const model = require("../models/index");
const User = require("../models/user-psql");

// utils
const utils = require("../utils/utils");
const debug = new Debug("backend:service:authentication");

const saltRounds = 10;
loadConfig();

const login = async (req, res, objUser) => {
  try {
    debug("Login User");
    let { email, password } = objUser;
    const users = await User.getAll();
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!foundUser) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Incorrect user or password",
        },
      });
    }
    const token = jwt.sign({ id: `${foundUser.id}`, idapp: `${foundUser.idapp}` }, process.env.SEED);
    res.json({
      ok: true,
      message: "User Loggin sucess",
      username: foundUser.name,
      id: foundUser.id,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "login backend err",
      err,
    });
  }
};

const recoveryPassword = async (req, res, objUser) => {
  try {
    debug("Recovery Password User");
    const { email } = objUser;
    model.User.findAll({
      returning: true,
      where: { email: email },
      raw: true,
    }).then((userDB) => {
      let userInfo = userDB.shift();
      if (!userInfo) {
        console.log("no existe email");
        return res.status(400).json({
          ok: false,
          err: {
            message: `email ${email} does not exist`,
          },
        });
      }
      utils.sendSimpleEamil(email);
      res.json({
        ok: true,
        message: `Send recovery password email sucessfuly at ${email}`,
      });
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      err,
    });
  }
};

// Services for psql user model

/**
 * Create user
 */
const signup = async (req, res) => {
  debug("create user");
  var data = req.body.userData;
  return await User
    .create(data)
    .then(user => {
      if (user.errors) {
        return res.status(401).json({
          ok: false,
          message: user.errors[0].message,
        });
      }
      res.json({
        ok: true,
        message: "created user successfully",
        user
      });
    })
    .catch((err) => {
      return res.status(400).json({
        ok: false,
        message: "error with creating user",
        err,
      });
    });
};

module.exports = {
  login,
  recoveryPassword,
  signup
};
