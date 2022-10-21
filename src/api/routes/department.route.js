const express = require('express')
const { getListDepartment, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/department.controllers')
const middlewareAuth = require('../middleware/auth')
const departmentRoute = express.Router()

departmentRoute.get('/departments', middlewareAuth.verifyToken, getListDepartment)
departmentRoute.post('/departments', middlewareAuth.verifyToken, createDepartment)
departmentRoute.put('/departments/:id', middlewareAuth.verifyToken, updateDepartment)
departmentRoute.delete('/departments/:id', middlewareAuth.verifyToken, deleteDepartment)

module.exports = departmentRoute