const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const userRoute = require('./api/routes/userRoute')
const app = express()
app.use(morgan('combined'))
app.use(express.json())
// create application/x-www-form-urlencoded parser
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/datn-pht');
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

app.use('/', userRoute)

module.exports = app

