'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Trucks', {
      plateNumber: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.INTEGER
      },
      width: {
        type: Sequelize.INTEGER
      },
      heigth: {
        type: Sequelize.INTEGER
      },
      maxPayload: {
        type: Sequelize.INTEGER
      },
      route: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      operation_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Trucks');
  }
};