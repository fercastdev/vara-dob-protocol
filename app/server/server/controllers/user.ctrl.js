'use strict'

const userService = require('../services/user.service')
const _ = require('underscore')

// utils
const utils = require('../utils/utils')

const Debug = require('debug')
const debug = new Debug('backend:controller:user')
const saltRounds = 10

const getUsers = async (req, res) => {
    // route /users?limit=<value>&start=<value>
    console.log(` QueryParams `, req.query)
    let start = req.query.start || 0
    start = Number(start)
    let limit = req.query.limit || 15
    limit = Number(limit)
    const users = await userService.getUsers(req, res, start, limit)
}

const getUserById = async (req, res) => {
    let userId = req.params.id
    let body = req.body
    const user = await userService.getUserById(req, res, body, userId)
}

const getMe = async (req, res) => {
    let userId = req.userId
    const user = await userService.getMe(req, res, userId)
}


const postCreateUserAdmin = async (req, res) => {
    const userData = req.body
    console.log('create User Admin Ctrl', userData)
    const user = await userService.createUserAdmin(req, res, userData)
}

const postCreateUser = async (req, res) => {
    const userData = req.body;
    console.log('create User Ctrl', userData);
    if (_.isEmpty(userData)) {
        return res.status(400).json({
            ok: false,
            message: `Empty body of User or userId provided`,
            err: `no info for update`
        });
    }
    const user = await userService.createUser(req, res, userData);
}

const updateUserPassword = async (req, res) => {

    let userId = req.body.id
    if (_.isEmpty(req.body)) {
        return res.status(400).json({
            ok: false,
            message: `Empty body of User or not userId provided`,
            err: `we can't update password`
        })
    }
    let cleanBody = _.pick(req.body, ['newPassword'])
    cleanBody.newPassword = utils.hashPassword(req.body.newPassword, saltRounds)
    const userPassword = await userService.updateUserPassword(req, res, cleanBody, userId)
}

const updateUser = async (req, res) => {
    let id = req.params.id
    if (_.isEmpty(req.body) || !id) {
        return res.status(400).json({
            ok: false,
            message: `Empty body of User or userId provided`,
            err: `no info for update`
        });
    }
    // _.pick grabs and object and return the same object with keys you defined into arrays as second parameter
    let CleanBody = _.pick(req.body, ['name', 'email', 'rol'])
    const userUpd = await userService.updateUser(req, res, CleanBody, id)
}

const hardDeleteUser = async (req, res) => {
    console.log(` Delete Users - hard delete `)
    let idUser = req.params.id

    const userHardDelete = await userService.hardDeleteUser(req, res, idUser)
}

const softDeleteUser = async (req, res) => {
    console.log(` delete User - soft delete `)
    let idUser = req.params.id
    req.body.state = false
    let body = _.pick(req.body, ['state'])

    const userDel = await userService.softDeleteUser(req, res, body, idUser)
}

const getDefinitorUser = async (req, res) => {
    console.log(req.query)
    const userDef = await userService.getDefinitorUser(req, res, req.query.operation)
}

module.exports = {
    getUsers,
    getUserById,
    postCreateUser,
    postCreateUserAdmin,
    updateUserPassword,
    updateUser,
    hardDeleteUser,
    softDeleteUser,
    getDefinitorUser,
    getMe
}