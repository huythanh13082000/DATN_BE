const express = require('express');
const { upload } = require('../../app');
const { uploadFile } = require('../controllers/uploadFIle.controllers');
const middlewareAuth = require('../middleware/auth');
const route = express.Router()
const uploadFileRoute = route;
uploadFileRoute.post('/uploadFile', middlewareAuth.verifyToken, uploadFile)
module.exports = uploadFileRoute