'use strict'

module.exports = (sequelize, DataTypes) => {
    const Camera = sequelize.define('Camera', {
        name: DataTypes.STRING,
        hub_id: DataTypes.INTEGER,
        serie: DataTypes.STRING,
        show: DataTypes.BOOLEAN,
        recorder_state: DataTypes.BOOLEAN,
        zone: DataTypes.STRING,
        ip_server: DataTypes.STRING,
        pass_server: DataTypes.STRING,
        dns_server: DataTypes.STRING
    }, {})
    Camera.associate = function(models) {
        Camera.belongsTo(models.Hub, {
            foreignKey: 'plant_id',
            as: 'plant',
            onDelete: 'CASCADE',
        })
    }
    return Camera
}