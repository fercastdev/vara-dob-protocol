const Sequelize = require('sequelize')
const { loadConfig } = require('../config/config')
loadConfig();

console.log(process.env.DB_USER);

let connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
const sequelize = new Sequelize(`${connectionString}`)

module.exports = sequelize