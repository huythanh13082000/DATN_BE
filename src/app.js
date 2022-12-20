const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const multer = require('multer')
const { uploadFile } = require('./api/controllers/uploadFIle.controllers');
const userRoute = require('./api/routes/user.route')
const uploadFileRoute = require('./api/routes/uploadFile.route');
const middlewareAuth = require('./api/middleware/auth');
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
const personnelFineRoute = require('./api/routes/personnelFine.route');
const salaryRoute = require('./api/routes/salary.route');
const personnelDayOffRoute = require('./api/routes/personnelDayOff.route');

var cors = require('cors');
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
main().catch(err => console.log(err));

async function main() {
  mongoose.connect(process.env.URL,
    () => {
      console.log('Connected to MongoDB');
    });
}
app.get('/', function (req, res) {
  res.send('BE DATN')
})
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
  return res.json('sadasd')
})


module.exports = { app, upload }

