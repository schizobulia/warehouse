const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '2833324528@qq.com',
        pass: ''//这里为qq的密要

    }
});
let mailOptions = {
    from: '2833324528@qq.com',
    to: '452076103@qq.com', // 接受者,可以同时发送多个,以逗号隔开  
    subject: '您好'
};

/**
 * 发送邮箱的脚本　
 * @email: 需要发送的邮箱
 * @content: 内容
 */

function sendEmail(email, content) {
    if (!email || !content) {
        return 'Invalid content';
    }
    mailOptions.to = email;
    mailOptions.html = `<h2>${content}</h2>`;
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
        // console.log('send email ok');
    });
}

module.exports = sendEmail;
