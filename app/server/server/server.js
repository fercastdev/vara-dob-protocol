"use strict";

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Debug = require("debug");
//const { loadConfig } = require("./config/config");
const tetris4dDatabase = require('./db/tetris4d');
var compression = require("compression");
var path = require("path");
var fs = require("fs");

app.use(compression());
// API stuff

// parse applicattion /x-www/form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

app.use(cookieParser());

app.use(cors());
app.use(require("./config/headers"));

//loadConfig();
// loadTetrisDB();

const debug = new Debug("backend-api:root");
app.use(require("./api/routes/indexRoutes"));

// sequelize.authenticate().then(() => {
//         console.log('PG Connection established successfully at', `postgres://${process.env.DB_USER}:${process.env.DB_PASSW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err)
//     })

// Angular stuff
const staticRoot = __dirname + "/public/";

app.use(function (req, res, next) {
  var accept = req.accepts("html", "json", "xml");
  if (accept !== "html") {
    return next();
  }
  var ext = path.extname(req.path);
  if (ext !== "") {
    return next();
  }
  fs.createReadStream(staticRoot + "index.html").pipe(res);
});

app.use(express.static(staticRoot));

app.listen(process.env.PORT, async () => {
  //try {
    //tetris4dDatabase.sync();
    //console.log('Connected to database');
  //} catch (err) {
    //console.error('Error. Can´t connect to database:', err);
  //}
  console.log(`API Listen port ${process.env.PORT}`);
});
