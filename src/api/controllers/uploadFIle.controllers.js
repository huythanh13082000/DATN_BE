const express = require('express')

const uploadFile = async (req, res, next) => {
  const file = req.file
  const test = req.test
  console.log(33, test)
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  console.log(file);
  res.send(file)
}
module.exports = { uploadFile }