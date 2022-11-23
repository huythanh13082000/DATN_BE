const express = require('express')
const { createSalary, getSalary } = require('../controllers/salary.controllers')
const middlewareAuth = require('../middleware/auth')
const salaryRoute = express.Router()

salaryRoute.post('/salarys', middlewareAuth.verifyToken, createSalary)
salaryRoute.get('/salarys', middlewareAuth.verifyToken, getSalary)

module.exports = salaryRoute