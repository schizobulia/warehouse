'use strict';
const nodemailer = require('nodemailer');
/**
 * 测试qq邮箱
 */
// async function main() {
//     let transporter = nodemailer.createTransport({
//         service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
//         port: 465, // SMTP 端口
//         secureConnection: true, // 使用了 SSL
//         auth: {
//             user: '2833324528@qq.com', // generated ethereal user
//             pass: '此处为你的授权码' // generated ethereal password
//         },

//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '"Fred Foo 👻" <2833324528@qq.com>', // sender address
//         to: '15135460425@163.com', // list of receivers
//         subject: 'Hello ✔', // Subject line
//         text: 'Hello world?', // plain text body
//         html: '<b>Hello world?</b>' // html body
//     });

//     console.log('Message sent: %s', info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }


/**
 * 163邮箱
 */
async function main() {
    let transporter = nodemailer.createTransport({
        service: '163', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            type: 'login',
            user: 'lab5088@163.com', // generated ethereal user
            pass: '此处为你的授权码' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }

    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <lab5088@163.com>', // sender address
        to: '2833324528@qq.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);