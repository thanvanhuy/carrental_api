const nodemailer = require('nodemailer');
const { request, response } = require("express");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASS
  }
});

const sendMail = (_req = request, _res = response) => {
  const mailOptions = {
    from: 'thanhoang810@gmail.com',
    to: 'tranvantumm1611@gmail.com',
    subject: 'Vui lòng kiểm tra, có khách hàng mới đặt xe',
    text: 'Kiểm tra lại nhé, lúa đang về!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      _res.json({
        success: false,
        msg: 'Gửi liên hệ',
        error: error
      });
    } else {
      _res.json({
        success: true,
        status: 200,
        msg: 'Gửi liên hệ thành công'
      });
    }
  });
};

module.exports = sendMail;
