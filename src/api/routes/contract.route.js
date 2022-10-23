const express = require('express')
const { createContract, deleteContract, updateContract, getContract, getListContract } = require('../controllers/contract.controllers')
const middlewareAuth = require('../middleware/auth')
const contractRoute = express.Router()

contractRoute.post('/contract', middlewareAuth.verifyToken, createContract)
contractRoute.delete('contract/:id', middlewareAuth.verifyToken, deleteContract)
contractRoute.put('/contract/:id', middlewareAuth.verifyToken, updateContract)
contractRoute.get('/contract/:id', middlewareAuth.verifyToken, getContract)
contractRoute.get('/contract', middlewareAuth.verifyToken, getListContract)

module.exports = contractRoute