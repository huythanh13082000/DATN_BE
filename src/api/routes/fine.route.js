const express = require('express')
const { createFine, updateFine, deleteFine, getFine, getListFine } = require('../controllers/fine.controllers')
const middlewareAuth = require('../middleware/auth')
const fineRoute = express.Router()

fineRoute.post('/fines', middlewareAuth.verifyToken, createFine)
fineRoute.put('/fines', middlewareAuth.verifyToken, updateFine)
fineRoute.delete('/fines', middlewareAuth.verifyToken, deleteFine)
fineRoute.get('/fines', middlewareAuth.verifyToken, getListFine)
fineRoute.get('/fines/:id', middlewareAuth.verifyToken, getFine)


module.exports = fineRoute
