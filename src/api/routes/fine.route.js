const express = require('express')
const { createFine, updateFine, deleteFine, getFine, getListFine } = require('../controllers/fine.controllers')
const middlewareAuth = require('../middleware/auth')
const fineRoute = express.Router()

fineRoute.post('/fine', middlewareAuth.verifyToken, createFine)
fineRoute.put('/fine/:id', middlewareAuth.verifyToken, updateFine)
fineRoute.delete('/fine/:id', middlewareAuth.verifyToken, deleteFine)
fineRoute.get('/fine/:id', middlewareAuth.verifyToken, getFine)
fineRoute.get('/fine', middlewareAuth.verifyToken, getListFine)

module.exports = fineRoute
