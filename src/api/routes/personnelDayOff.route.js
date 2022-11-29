const express = require('express')
const { createPersonnelDayOff, updatePersonnelDayOff, deletePersonnelDayOff, getListPersonnelDayOff, getPersonnelDayOff } = require('../controllers/personnelDayOff.controller')

const middlewareAuth = require('../middleware/auth')

const personnelDayOffRoute = express.Router()
personnelDayOffRoute.post('/personnelDayOff', middlewareAuth.verifyToken, createPersonnelDayOff)
personnelDayOffRoute.put('/personnelDayOff', middlewareAuth.verifyToken, updatePersonnelDayOff)
personnelDayOffRoute.delete('/personnelDayOff', middlewareAuth.verifyToken, deletePersonnelDayOff)
personnelDayOffRoute.get('/personnelDayOff', middlewareAuth.verifyToken, getListPersonnelDayOff)
personnelDayOffRoute.get('/personnelDayOff/:id', middlewareAuth.verifyToken, getPersonnelDayOff)


module.exports = personnelDayOffRoute
