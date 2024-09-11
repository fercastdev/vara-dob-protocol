'use strict'

module.exports = (sequelize, DataTypes) => {
  const Operation = sequelize.define('Operation', {
    name: DataTypes.STRING,
  }, {})
  Operation.associate = function(models) {
    Operation.hasMany(models.Truck, {
      foreignKey: 'plateNumber',
      as: 'trucks',
      onDelete: 'CASCADE',
  })
  }
  return Operation
}