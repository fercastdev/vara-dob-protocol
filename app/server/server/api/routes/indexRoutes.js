const express = require("express");

const app = express();

/**
 * Routes
 */
app.use(require('./users'))
app.use(require("./login"));
app.use(require("./operations"));
app.use(require("./clients"));
app.use(require("./pools"));
app.use(require("./balance"));
app.use(require("./coordinateValidator"));


module.exports = app;
