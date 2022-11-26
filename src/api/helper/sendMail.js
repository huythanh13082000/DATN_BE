const nodemailer = require("nodemailer");
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
          let code = Math.floor(Math.random() * (999999 - 100000)) + 100000
          await transporter.sendMail({
                    from: 'huythanh1308bn@gmail.com', // sender address
                    to: infor.email, // list of receivers
                    subject: "PHT_APP xác nhận email", // Subject line
                    text: "PHT_APP xác nhận email", // plain text body
                    html: `<div>
                    <div style="padding: 20px;padding-left: 0;border-bottom: 1px solid rgba(0, 0, 0, 0.179);">
                              <b style="color: #03a9f4;font-size: 20px;">Xác nhận email</b>
                    </div>
                    <p>Xin chào ${infor.email}!</p>
                    <p>Ít phút trước, bạn đã đăng dùng
                    <a href="">${infor.email}</a> đăng ký tài khoản PHT_APP</p>
                    <p>Vui lòng xác nhận địa chỉ email này
                              để chúng tôi có thể hoàn tất
                              việc tạo tài khoản cho bạn.</p>
                    <p>Bạn có thể được yêu cầu nhập mã xác nhận sau ${code}.</p>
                    <br>
                    <p>Trân trọng cảm ơi!</p>
                    <p>Đội ngũ PHT_APP.</p>

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