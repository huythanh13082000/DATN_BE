const express = require('express')
const { createSalary } = require('../controllers/salary.controllers')
const middlewareAuth = require('../middleware/auth')
const salaryRoute = express.Router()

salaryRoute.post('/salarys', middlewareAuth.verifyToken, createSalary)

module.exports = salaryRoute