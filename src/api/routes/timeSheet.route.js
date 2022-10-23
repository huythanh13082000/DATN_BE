const express = require('express')
const { createTimeSheet, updateTimeSheet, deleteTimeSheet, getTimeSheet, getListTimeSheet } = require('../controllers/timeSheet.controllers')
const middlewareAuth = require('../middleware/auth')
const timeSheetRoute = express.Router()

timeSheetRoute.post('/timeSheet', middlewareAuth.verifyToken, createTimeSheet)
timeSheetRoute.put('/timeSheet', middlewareAuth.verifyToken, updateTimeSheet)
timeSheetRoute.delete('/timeSheet/:id', middlewareAuth.verifyToken, deleteTimeSheet)
timeSheetRoute.get('/timeSheet/:id', middlewareAuth.verifyToken, getTimeSheet)
timeSheetRoute.get('/timeSheet', middlewareAuth.verifyToken, getListTimeSheet)

module.exports = timeSheetRoute