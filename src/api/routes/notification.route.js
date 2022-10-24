const express = require('express')
const { createNotification, updateNotification, deleteNotification, getNotification, getListNotification } = require('../controllers/notification.controllers')
const middlewareAuth = require('../middleware/auth')
const notificationRoute = express.Router()

notificationRoute.post('/nonotification', middlewareAuth.verifyToken, createNotification)
notificationRoute.put('/nonotification/:id', middlewareAuth.verifyToken, updateNotification)
notificationRoute.delete('/nonotification/:id', middlewareAuth.verifyToken, deleteNotification)
notificationRoute.get('/nonotification/:id', middlewareAuth.verifyToken, getNotification)
notificationRoute.get('/nonotification', middlewareAuth.verifyToken, getListNotification)

module.exports = notificationRoute
