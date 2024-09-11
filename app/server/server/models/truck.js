"use strict";

module.exports = (sequelize, DataTypes) => {
  const Truck = sequelize.define(
    "Truck",
    {
      plateNumber: DataTypes.STRING,
      length: DataTypes.INTEGER,
      width: DataTypes.INTEGER,
      heigth: DataTypes.INTEGER,
      maxPayload: DataTypes.INTEGER,
      route: DataTypes.ARRAY(DataTypes.STRING),
      operation_id: DataTypes.INTEGER,
      costValue: DataTypes.INTEGER,
    },
    {}
  );
  Truck.associate = (models) => {
    Truck.belongsTo(models.Operation, {
      foreignKey: "operation_id",
      as: "operation",
    });
  };
  Truck.removeAttribute("id");

  return Truck;
};
