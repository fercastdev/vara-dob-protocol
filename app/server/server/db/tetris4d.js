  
const Sequelize = require("sequelize");

const tetris4d = new Sequelize('tetris4d', 'tetris4d', 'tetris4d', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  port: '55444',
});

module.exports = tetris4d;