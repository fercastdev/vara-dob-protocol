'use strict'
const dataTypes = require('sequelize').DataTypes;
const tetris4d = require('../db/tetris4d');

const user = tetris4d.define(
  'user',
  {
    email: {
      type: dataTypes.STRING
    },
    name: {
      type: dataTypes.STRING
    },
    password: {
      type: dataTypes.STRING
    },
    idapp: {
      type: dataTypes.INTEGER
    },
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

user.getById = async (id) => {
  try {
    const res = await user.findOne({ where: { id: id } });
    return res.dataValues;
  } catch (error) {
    return error;
  }
}

user.getAll = async () => {
  try {
    const res = await user.findAll({ order: [['id', 'ASC']] });
    return res.map(data => {
      return data.dataValues;
    });
  } catch (error) {
    return error;
  }
}

user.create = async (data) => {
  try {
    const newData = user.build({
      email: data.email,
      name: data.name,
      password: data.password,
      idapp: data.idapp,
    });
    await newData.save();
    return newData.dataValues;
  } catch (error) {
    return error;
  }
}

module.exports = user;