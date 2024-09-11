'use strict'

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        password_hash: DataTypes.STRING,
        email: DataTypes.STRING,
        auth_token: DataTypes.STRING(1250),
    }, {})
    User.associate = function(models) {
        User.hasMany(models.Plant, {
            foreignKey: 'user_id',
            as: 'plants'
        })
    }
    return User
}