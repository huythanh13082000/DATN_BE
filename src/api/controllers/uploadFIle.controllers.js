const express = require('express')

const uploadFile = async (req, res, next) => {
  const file = req.file
  const test = req.test
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)
}
module.exports = { uploadFile }