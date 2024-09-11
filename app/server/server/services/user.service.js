'use strict'

const Debug = require('debug')
const _ = require('underscore')
const jwt = require('jsonwebtoken')
const { loadConfig } = require('../config/config')

// models
const model = require('../models/index')
const User = require("../models/user-psql");
// utils
const utils = require('../utils/utils')

const debug = new Debug('backend:service:user')
const saltRounds = 10
loadConfig()

const getUsers = async(req, res, start, limit) => {

    console.log('User Data pass with middleware', req.user)
    return await model.User.findAll({
            attributes: ['id', 'name', 'email'],
            order: [
                ['id', 'DESC']
            ],
            raw: true
        })
        .then((users) => {
            res.json({
                ok: true,
                message: 'get list of users successfully',
                numUsers: users.length,
                users
            })
        })
        .catch((err) => {
            return res.status(400).json({
                ok: false,
                message: `user does not exist`,
                err
            })
        })
}

const getUserById = async(req, res, ObjectUser, userId) => {
    console.log(userId)
    return await model.User.findByPk(userId,{
        attributes: ['id', 'name', 'email', 'createdAt']
    }).then((userDB) => {
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `User ${userId} does not exist`
                }
            })
        }
        res.json({
            ok: true,
            message: `the user ${userId} exist`,
            user: userDB,
            editUser: true
        })
    }).catch((err) => {
        return res.status(500).json({
            ok: false,
            message: `Users getById troubles in backend, API Error`,
            err
        })
    })
}

const getMe = async(req, res, userId) => {
    
    return await User.findByPk(userId,{
        attributes: ['id','email']
    }).then((userDB) => {
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `User ${userId} does not exist`
                }
            })
        }
        var companyObject = {
            "id": 1,
            "name": "Spaceweare",
            "rut": "77.166.821-6"
        }
        res.json({
            ok: true,
            user: userDB,
            company: companyObject
        })
    }).catch((err) => {
        return res.status(500).json({
            ok: false,
            message: `Users getById troubles in backend, API Error`,
            err
        })
    })
}

const createUserAdmin = async(req, res, objUser) => {
    debug('Create Admin User')
    console.log('CREATING USER ADMIN')
    let newUser = {
        name: objUser.name,
        email: objUser.email,
        password_hash: utils.hashPassword(objUser.password, saltRounds),
        auth_token: ''
    }
    let token = jwt.sign({
        user: {
            name: objUser.name,
            email: objUser.email,
            rol: objUser.rol
        },
    }, process.env.SEED, { expiresIn: process.env.TIME_TOKEN })
    newUser['auth_token'] = token
    if (!objUser.password) {
        console.log('password was generate randomly')
    }
    return await model.User.create(newUser).then((userDB) => {
        res.json({
            ok: true,
            message: 'create users sucessfully',
            user: userDB
        })
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            message: `problems with users creation, db troubles`,
            err
        })
    })
}

const createUser = async(req, res, objUser) => {
    debug('Create User')
    if (!objUser.password_hash) {
        console.log('password was generate randonly')
    }
    let newUser = {
        name: objUser.name,
        email: objUser.email,
        password_hash: await utils.hashPassword(objUser.password_hash ? objUser.password_hash : utils.generateRandomPass(), saltRounds),
        auth_token: ''
    }
    let token = jwt.sign({
        user: {
            name: objUser.name,
            email: objUser.email,
            rol: objUser.rol
        },
    }, process.env.SEED, { expiresIn: process.env.TIME_TOKEN })
    newUser['auth_token'] = token

    console.log('Usuario con token generado', newUser)

    return await model.User.create(newUser).then((userDB) => {
        res.json({
            ok: true,
            message: 'create users sucessfully',
            user: userDB
        })
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            message: `problems with users creation, db troubles`,
            err
        })
    })
}


const updateUserPassword = async(req, res, objPassw, userId) => {
    console.log('endpoint en construccion', objPassw, userId)
}

const updateUser = async(req, res, objUser, userId) => {
    return await model.User.update(objUser, {
            returning: true,
            where: { id: userId }
        }).then(([rowsUpdate, [updatedUser]]) => {
            res.json({
                ok: true,
                message: `Update user ${userId} sucessfully`,
                userUpdated: userId,
                user: updatedUser
            })
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                message: `Users troubles in backend, API Error`,
                err
            })
        })
}

const hardDeleteUser = async(req, res, userId) => {
    return await model.User.destroy(({
            where: { id: userId }
        })).then((userDelete) => {
            if (!userDelete) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'User does not exist'
                    }
                })
            }
            res.json({
                ok: true,
                message: 'user delete sucessfully',
                user: userId
            })
        })
        .catch((err) => {
            return res.status(400).json({
                ok: false,
                message: `problems with users hard delete`,
                err
            })
        })

}

const getDefinitorUser = async(req, res, operation) => {

    let listPlantsByUser = await model.Plant.findAll({
            attributes: ["id", 'name'],
            where: {
                user_id: 17
            }
        })
        .map(plant => {
            return {
                id: plant.id,
                label: plant.name
            }
        })

    if (operation === 'info') {
        console.log(operation)
        let definitor = await utils.getDataTypeInfo(model.User.options.name.singular)
        if (definitor.length < 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `trubles User definitor ${operation}`
                }
            })
        }
        res.json({
            ok: true,
            message: `User definitor ${operation}`,
            definitor
        })
    } else if (operation === 'info_table') {
        console.log(operation)
        let definitor = await utils.getDataTypeInfoTable(model.User.options.name.singular)
        if (definitor.length < 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `trubles User definitor ${operation}`
                }
            })
        }
        res.json({
            ok: true,
            message: `User definitor ${operation}`,
            definitor
        })
    } else if (operation === 'create') {
        console.log(operation, 'service')
        let definitor = await utils.getDataTypeModelCreate(model.User.options.name.singular)
        console.log(definitor)
        if (definitor.length < 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `trubles User definitor ${operation}`
                }
            })
        }
        res.json({
            ok: true,
            message: `User definitor ${operation}`,
            definitor
        })
    } else if (operation === 'association') {
        console.log(operation)
        let definitor = await utils.getDataTypeAssociation(model.User.options.name.singular, operation, listPlantsByUser)
        console.log(definitor)
        if (definitor.length < 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `trubles User definitor ${operation}`
                }
            })
        }
        res.json({
            ok: true,
            message: `User definitor ${operation}`,
            definitor
        })
    } else {
        console.log(operation)
        let definitor = await utils.getDataTypeModel(model.User.options.name.singular, operation)
        console.log(definitor)
        if (definitor.length < 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `trubles User definitor ${operation}`
                }
            })
        }
        res.json({
            ok: true,
            message: `User definitor ${operation}`,
            definitor
        })
    }
}

module.exports = {
    createUser,
    createUserAdmin,
    getUserById,
    getUsers,
    updateUserPassword,
    updateUser,
    hardDeleteUser,
    getDefinitorUser, 
    getMe
}
