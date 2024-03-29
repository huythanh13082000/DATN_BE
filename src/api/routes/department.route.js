const express = require('express')
const multer = require('multer');
const upload = multer();
const { getListDepartment, createDepartment, updateDepartment, deleteDepartment, exportExcelDepartment, getDepartmentColumn } = require('../controllers/department.controllers')
const middlewareAuth = require('../middleware/auth')
const departmentRoute = express.Router()

departmentRoute.get('/departments', middlewareAuth.verifyToken, getListDepartment)
departmentRoute.post('/departments', middlewareAuth.verifyToken, createDepartment)
departmentRoute.put('/departments', middlewareAuth.verifyToken, updateDepartment)
departmentRoute.delete('/departments', middlewareAuth.verifyToken, deleteDepartment)
departmentRoute.get('/departments/export-excel', middlewareAuth.verifyToken, exportExcelDepartment)
departmentRoute.get('/departments/columns', middlewareAuth.verifyToken, getDepartmentColumn)

module.exports = departmentRoute