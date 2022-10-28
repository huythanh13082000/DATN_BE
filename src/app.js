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
const { readFile } = require('./api/helper/readExcel');
const { parse } = require('json2csv');
var cors = require('cors')

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
    const fileName = file.fieldname + '-' + Date.now() + '.png'
    cb(null, fileName)
  }
})

const upload = multer({ storage: storage })

// app.use(cors());
// create application/x-www-form-urlencoded parser
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/datn-pht');
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
// data = [{

//   firstName: 'John',

//   lastName: 'Doe'

// }, {

//   firstName: 'Smith',

//   lastName: 'Peters'

// }, {

//   firstName: 'Alice',

//   lastName: 'Lee'

// }]
// app.get('/api', (req, res) => {
//   try {

//     const fields = [
//       "carModel",
//       "price",
//       "color"
//     ];
//     const opts = { fields };
//     const csv = parse([{ "price": 1000 }, { "price": 2000 }], opts);
//     res.attachment('customers.csv').send(csv)
//   }
//   catch (err) {
//     console.log(err)
//   }
// })


app.post('/uploadFile', middlewareAuth.verifyToken, upload.single('avatar'), uploadFile);

// console.log(readFile('demo2.xlsx'))
// var data = [
//   ["Joa Doe", "joa@doe.com", "asas"],
//   ["Job Doe", "job@doe.com"],
//   ["Joe Doe", "joe@doe.com"],
//   ["Jon Doe", "jon@doe.com"],
//   ["Joy Doe", "joy@doe.com"]
// ];
// var workbook = XLSX.utils.book_new(),
//   worksheet = XLSX.utils.aoa_to_sheet(data);
// workbook.SheetNames.push("First");
// workbook.Sheets["First"] = worksheet;
// XLSX.writeFile(workbook, "demo2.xlsx");

// Requiring the module


// Reading our test file
// const file = XLSX.readFile('uploads/file.csv')

// let data = []

// const sheets = file.SheetNames

// for (let i = 0; i < sheets.length; i++) {
//   const temp = XLSX.utils.sheet_to_json(
//     file.Sheets[file.SheetNames[i]])
//   temp.forEach((res) => {
//     console.log(res)
//     data.push(res)
//   })
// }

// Printing data
// console.log(1,data)



// Requiring module
// const reader = require('xlsx')

// Reading our test file
const XLSX = require('xlsx')



// const ws = XLSX.utils.json_to_sheet(data)

// const wb = XLSX.utils.book_new()

// const a = XLSX.utils.book_append_sheet(wb, ws, 'Responses')
// const b = XLSX.writeFile(wb, 'uploads/sampleData.export.xlsx')
// console.log(b)

// XLSX.writeFile(wb, 'sampleData.export.xlsx')

// const url = window.URL.createObjectURL(file);
// const link = document.createElement('a');
// link.href = url;
// link.setAttribute('download', 'file.pdf'); //or any other extension
// document.body.appendChild(link);
// link.click();

// Writing to our file

module.exports = { app, upload }

