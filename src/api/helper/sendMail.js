const nodemailer = require("nodemailer");
const moment = require("moment/moment");
const personnelModel = require("../models/personnel.model");
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
  let code = Math.floor(Math.random() * (999999 - 100000)) + 100000
  const personnel = await personnelModel.findOne({ email: infor.email }).populate('rank')
  console.log(234, personnel);
  await transporter.sendMail({
    from: 'huythanh1308bn@gmail.com', // sender address
    to: 'htt130820@gmail.com', // list of receivers
    subject: `Phiếu Lương Tháng ${moment().format('MM')}`, // Subject line
    text: "PHT_APP xác nhận email", // plain text body
    html: `<div>
                    <div style="padding: 20px;padding-left: 0;border-bottom: 1px solid rgba(0, 0, 0, 0.179);">
                              <b style="color: #03a9f4;font-size: 20px;">Phiếu Lương Tháng ${moment().format('MM')}</b>
                    </div>
                    <p>Tiền Thưởng: </p>
                ${infor.listBonus && infor.listBonus.length && infor.listBonus.map((item) => {
      return `${JSON.parse(item).name} -  ${JSON.parse(item).value}`
    })}
    <p>Tiền Phạt: </p>
    ${infor.listFine && infor.listFine.length ?
        infor.listFine.map((item) => {
          return `${JSON.parse(item).name} -  ${JSON.parse(item).value}`
        }) : 'Không có'}
          </div>`
  })
  return code
  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
module.exports = sendMail