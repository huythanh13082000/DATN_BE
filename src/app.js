const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const userRoute = require('./api/routes/user.route')
const bodyParser = require('body-parser')
const multer = require('multer')
const uploadFileRoute = require('./api/routes/uploadFile.route');
const middlewareAuth = require('./api/middleware/auth');
const { uploadFile } = require('./api/controllers/uploadFIle.controllers');
const departmentRoute = require('./api/routes/department.route');
const rankRoute = require('./api/routes/rank.route');
const contractRoute = require('./api/routes/contract.route');
const personnelRoute = require('./api/routes/personnel.route');
const timeSheetRoute = require('./api/routes/timeSheet.route');
const bonusRoute = require('./api/routes/bonus.route');
const personnelBonusRoute = require('./api/routes/personnelBonus.route');
const fineRoute = require('./api/routes/fine.route');
const allowanceRoute = require('./api/routes/allowance.route');
const personnelAllowanceRoute = require('./api/routes/personnelAllowance.route');
const notificationRoute = require('./api/routes/notification.route');
var cors = require('cors');
const personnelFineRoute = require('./api/routes/personnelFine.route');
const salaryRoute = require('./api/routes/salary.route');
const personnelDayOffRoute = require('./api/routes/personnelDayOff.route');
require('dotenv').config()

const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const arrayOriginalnameSplited = file.originalname.split('.')
    const typeFile = arrayOriginalnameSplited[arrayOriginalnameSplited.length - 1]
    const fileName = file.fieldname + '-' + Date.now() + '.' + typeFile
    cb(null, fileName)
    req.filename = fileName
  }
})

const upload = multer({ storage: storage })

// app.use(cors());
// create application/x-www-form-urlencoded parser
main().catch(err => console.log(err));

async function main() {
  // const uri = process.env.URL
  // console.log(uri)
  // "mongodb+srv://phthanh1308:Phamhuythanh1308@cluster0.6u4juwz.mongodb.net/DATN";
  console.log(444, process.env.URL)
  mongoose.connect(process.env.URL,
    () => {
      console.log('Connected to MongoDB');
    });
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
app.use('/api', userRoute)
app.use('/api', uploadFileRoute)
app.use('/api', departmentRoute)
app.use('/api', rankRoute)
app.use('/api', contractRoute)
app.use('/api', personnelRoute)
app.use('/api', timeSheetRoute)
app.use('/api', bonusRoute)
app.use('/api', personnelBonusRoute)
app.use('/api', fineRoute)
app.use('/api', allowanceRoute)
app.use('/api', personnelAllowanceRoute)
app.use('/api', notificationRoute)
app.use('/api', personnelFineRoute)
app.use('/api', salaryRoute)
app.use('/api', personnelDayOffRoute)
app.post('/uploadFile', middlewareAuth.verifyToken, upload.single('avatar'), uploadFile);
app.post('/uploadFileCSV', middlewareAuth.verifyToken, upload.single('file'), uploadFile);
const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'file', maxCount: 1 }])
app.post('/readFile', cpUpload, (req, res) => {
  console.log(555555, req.files.avatar[0].path);
  console.log(66666, req.files.file[0].path);
  return res.json('sadasd')
})


module.exports = { app, upload }

