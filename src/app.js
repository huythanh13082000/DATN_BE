const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const userRoute = require('./api/routes/user.route')
const bodyParser = require('body-parser')
const multer = require('multer')
const uploadFileRoute = require('./api/routes/uploadFile.route');

const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const fileName = file.fieldname + '-' + Date.now() + '.png'
    cb(null, fileName)
  }
})

var upload = multer({ storage: storage })

// app.use(cors());
// create application/x-www-form-urlencoded parser
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/datn-pht');
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

app.use('/api', userRoute)
app.use('/api', uploadFileRoute)
app.post('/uploadFile', upload.single('avatar'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  console.log(req.file, req.body)
});

module.exports = { app, upload }

