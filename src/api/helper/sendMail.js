const nodemailer = require("nodemailer");
const moment = require("moment/moment");
const personnelModel = require("../models/personnel.model");
const { numberWithCommas } = require("./numberWithCommas");
// Only needed if you don't have a real mail account for testing
const sendMail = async (infor = {}) => {
  console.log(345, infor.listBonus);
  await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: "huythanh1308bn@gmail.com", // generated ethereal user
      pass: "pscecqvaiytrpiwl", // generated ethereal password
    },
  });
  // send mail with defined transport object
  const personnel = await personnelModel.findOne({ email: infor.email }).populate('rank')
  console.log(234, personnel);
  await transporter.sendMail({
    from: 'huythanh1308bn@gmail.com', // sender address
    to: `${infor.email}`, // list of receivers
    subject: `Phiếu Lương Tháng ${moment().format('MM')}`, // Subject line
    text: "PHT_APP xác nhận email", // plain text body
    html: `    <div style="text-align: center">
    <p style="font-weight: bold">CÔNG TY CỔ PHẦN THÀNH LIÊN</p>
    <p style="font-weight: bold">PHIẾU LƯƠNG THÁNG ${Number(moment().format('MM')) - 1}/${moment().format('YYYY')}</p>
    <p style="font-weight: bold">Họ và tên: ${infor.name}</p>
    <p style="font-weight: bold">Chức vụ: BE1</p>
    <p style="display: flex; justify-content: space-between">
      <span>Ngày công chuẩn: </span><span>24</span>
    </p>
    <p style="display: flex; justify-content: space-between">
      <span>Lương chính thức: </span><span> ${numberWithCommas(personnel.rank.value)} đ</span>
    </p>
    <p style="display: flex; justify-content: space-between">
    <span>Ngày công chuẩn: </span><span>${personnel.count}</span>
  </p>
    <p style="display: flex; justify-content: space-between">
      <span>Lương chính thức thực nhận: </span><span> ${numberWithCommas(infor.salary1)} đ</span>
    </p>
    <div>
      <div style="margin-right: 1rem;font-weight: bold;"><span>Thưởng: </span></div>
      <div>
      ${infor.listBonus ? infor.listBonus.map((item) => {
      return `<p style="margin: 0;">-${JSON.parse(item).name}: ${numberWithCommas(JSON.parse(item).value)} đ</p>`
    }) : ''}
      </div>
    </div>
    <br>
    <div>
      <div style="margin-right: 1rem;font-weight: bold"><span>Phạt: </span></div>
      <div>
      ${infor.listFine ? infor.listFine.map((item) => {
      return `<p style="margin: 0;">-${JSON.parse(item).name}: ${numberWithCommas(JSON.parse(item).value)} đ</p>`
    }) : ''}
      </div>
    </div>
    <p style="display: flex; justify-content: space-between">
      Trừ BHXH 10.5%
    </p>
    <p style="display: flex; justify-content: space-between;font-weight: bold;">
      <span>Lương thực nhận: </span><span> ${numberWithCommas(infor.salary)} đ</span>
    </p>
  </div>`
  })
  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
module.exports = sendMail