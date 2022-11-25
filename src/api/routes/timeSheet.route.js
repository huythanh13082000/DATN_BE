const express = require('express')
const { createTimeSheet, updateTimeSheet, deleteTimeSheet, getTimeSheet, getListTimeSheet, getListPersonnelTimeSheet, createTimeSheetMany, summaryOfWorkingDays, summaryOfSalary, exportExcelTimeSheet } = require('../controllers/timeSheet.controllers')
const middlewareAuth = require('../middleware/auth')
const timeSheetRoute = express.Router()

// timeSheetRoute.post('/timeSheets/many', middlewareAuth.verifyToken, createTimeSheetMany)
timeSheetRoute.post('/timeSheets', middlewareAuth.verifyToken, createTimeSheet)
timeSheetRoute.put('/timeSheets', middlewareAuth.verifyToken, updateTimeSheet)
timeSheetRoute.delete('/timeSheets', middlewareAuth.verifyToken, deleteTimeSheet)
timeSheetRoute.get('/timeSheets/summaryOfWorkingDays', middlewareAuth.verifyToken, summaryOfWorkingDays)
timeSheetRoute.get('/timeSheets/summaryOfSalary', middlewareAuth.verifyToken, summaryOfSalary)
timeSheetRoute.get('/timeSheets/export-excel', middlewareAuth.verifyToken, exportExcelTimeSheet)
timeSheetRoute.get('/timeSheets/personnels', middlewareAuth.verifyToken, getListPersonnelTimeSheet)
timeSheetRoute.get('/timeSheets/:id', middlewareAuth.verifyToken, getTimeSheet)
timeSheetRoute.get('/timeSheets', middlewareAuth.verifyToken, getListTimeSheet)


module.exports = timeSheetRoute