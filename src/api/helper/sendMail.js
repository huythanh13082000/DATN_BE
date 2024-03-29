const nodemailer = require("nodemailer");
const moment = require("moment/moment");
const personnelModel = require("../models/personnel.model");
const { numberWithCommas } = require("./numberWithCommas");
// Only needed if you don't have a real mail account for testing
const sendMail = async (infor = {}) => {
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
  await transporter.sendMail({
    from: 'huythanh1308bn@gmail.com', // sender address
    to: `${infor.email}`, // list of receivers
    subject: `Phiếu Lương Tháng ${moment().format('MM')}`, // Subject line
    text: "PHT Phiếu lương", // plain text body
    html: `    <div>
    <p style="font-weight: bold;style="text-align: center"">CÔNG TY CỔ PHẦN THÀNH LIÊN</p>
    <p style="font-weight: bold;style="text-align: center"">PHIẾU LƯƠNG THÁNG ${Number(moment().format('MM')) - 1}/${moment().format('YYYY')}</p>
    <p style="font-weight: bold;style="text-align: center"">Họ và tên:&nbsp;  ${infor.name}</p>
    <p style="font-weight: bold;style="text-align: center"">Chức vụ:&nbsp;  ${personnel.rank.name}</p>
    <p style="display: flex; justify-content: space-between">
      <span>Ngày công chuẩn:&nbsp;  </span><span>${infor.sumWorkingDay}</span>
    </p>
    <p style="display: flex; justify-content: space-between">
      <span>Lương chính thức:&nbsp;  </span><span> ${numberWithCommas(personnel.rank.value)}đ</span>
    </p>
    <p style="display: flex; justify-content: space-between">
    <span>Số công:&nbsp; </span><span>${infor.count}</span>
  </p>
    <p style="display: flex; justify-content: space-between">
      <span>Lương chính thức thực nhận:&nbsp; </span><span> ${numberWithCommas(infor.salary1)}đ</span>
    </p>
    <div>
      <div style="margin-right: 1rem;font-weight: bold;"><span>Thưởng: </span></div>
      <div>
      ${infor.listBonus ? infor.listBonus.map((item) => {
      return `<p style="margin: 0;">-${JSON.parse(item).name}: ${numberWithCommas(JSON.parse(item).value)}đ</p>`
    }) : 'Không'}
      </div>
    </div>
    <br>
    <div>
      <div style="margin-right: 1rem;font-weight: bold"><span>Phạt: </span></div>
      <div>
      ${infor.listFine ? infor.listFine.map((item) => {
      return `<p style="margin: 0;">-${JSON.parse(item).name}: ${numberWithCommas(JSON.parse(item).value)}đ</p>`
    }) : 'Không'}
      </div>
    </div>
    <p style="display: flex; justify-content: space-between">
      Trừ BHXH 10.5%: -${(Number(personnel.rank.value) * 10.5 / 100).toFixed()}đ
    </p>
    <p style="display: flex; justify-content: space-between;font-weight: bold;">
      <span>Lương thực nhận:&nbsp; </span><span> ${numberWithCommas(infor.salary)}đ</span>
    </p>
  </div>`
  })
}
module.exports = sendMail