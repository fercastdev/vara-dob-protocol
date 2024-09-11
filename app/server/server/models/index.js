const Sequelize = require("sequelize")
const User = require('./user')
const Operation = require('./operation')
const Truck = require('./truck');

const { loadConfig } = require('../config/config')
loadConfig();

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

module.exports = {
    User: User(sequelize, Sequelize.DataTypes),
    Operation: Operation(sequelize, Sequelize.DataTypes),
    Truck: Truck(sequelize, Sequelize.DataTypes),
    sequelize
}