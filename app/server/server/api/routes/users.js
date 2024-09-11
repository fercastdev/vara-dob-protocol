const express = require('express')
const userCtrl = require('../../controllers/user.ctrl')

/**
 * Auth middleware
 */
const { checkToken, checkAdMinRole } = require('../middleware/auth')

const app = express()

/**
 * GET: Validate Token
 */
 app.get('/api/v1/validate', checkToken, (req, res) => res.json({isValid: true}))

 /**
 * GET: Me
 */
  app.get('/api/v1/me', checkToken, userCtrl.getMe)

/**
 * GET: Definitor for user
 */
app.get('/api/v1/users/definitor?',  userCtrl.getDefinitorUser)

/**
 * GET: Users
 */
app.get('/api/v1/users',  userCtrl.getUsers)

/**
 * GET: User details
 */
app.get('/api/v1/users/:id', userCtrl.getUserById)

/**
 * POST: Create user
 */
app.post('/api/v1/users', userCtrl.postCreateUser)


/**
 * POST: Create admin
 */
app.post('/api/v1/users/admin', userCtrl.postCreateUserAdmin)

/**
 * PUT: Update user password
 */
app.put('/api/v1/users/password', userCtrl.updateUserPassword)

/**
 * PUT: Update user
 */
app.put('/api/v1/users/:id',  userCtrl.updateUser)

/**
 * DELETE: Delete user
 */
app.delete('/api/v1/users/:id', userCtrl.hardDeleteUser)

module.exports = app