const express = require('express')
const { createNotification, updateNotification, deleteNotification, getNotification, getListNotification } = require('../controllers/notification.controllers')
const middlewareAuth = require('../middleware/auth')
const notificationRoute = express.Router()

notificationRoute.post('/notification', middlewareAuth.verifyToken, createNotification)
notificationRoute.put('/notification', middlewareAuth.verifyToken, updateNotification)
notificationRoute.delete('/notification', middlewareAuth.verifyToken, deleteNotification)
notificationRoute.get('/notification', middlewareAuth.verifyToken, getListNotification)
notificationRoute.get('/notification/:id', middlewareAuth.verifyToken, getNotification)


module.exports = notificationRoute
