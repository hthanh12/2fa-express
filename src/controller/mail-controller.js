const {
    config
} = require('../config')
const moment = require('moment')
const nodemailer = require('nodemailer')
const nodemailerSendGrid = require('nodemailer-sendgrid')
const { User } = require('../model')

let sendEmail = async (info_mail) => {
    const transporter = nodemailer.createTransport(
        nodemailerSendGrid({
            apiKey: config('SENDGRID_KEY', String)
        })
    )
    try {
        await transporter.sendMail({
            from: `${config('EMAIL_NAME_ACCOUNT_SEND', String)} <${config('EMAIL_ACCOUNT_SEND', String)}>`,
            to: ['layne121296@gmail.com'],
            subject: info_mail.title,
            html: info_mail.content
        })
    } catch (error) {
        console.log(`Send mail error Title: ${info_mail.title}, receivers: ${info_mail.receivers} ,error: ${error}`)
        return
    }


    console.log('-------- Send Gmail --------')
    console.log('Time sent: %s', moment().format('YYYY-MM-DD HH:mm:ss'))
    console.log('Gmail receivers: %s', info_mail.receivers)
    console.log('----------------------------')
}
exports.generateContentMail = (data, type) => {
    console.log("🚀 ~ file: mail-controller.js ~ line 34 ~ data", data.otp_info)
    let info_mail = {
        title: '',
        content: '',
        receivers: [],
    }
    switch (type) {
        case 1:
            info_mail.title = `Warm Welcome - ${data.username}`
            info_mail.receivers = [data.email]
            info_mail.content = `
            <span>Hey ${data.name},</span>
            <br><br>
            <span>“Welcome ${data.name}, Hope you have a wonderful time here!”             </span>
            <br><br>
            <img src="https://www.wylieisd.net/cms/lib/TX01918453/Centricity/Domain/14929/welcomee.jpg" alt="welcome">
            <br>
            Thanks! 
            `
            break
        case 2:
            info_mail.title = `Email Verification - ${data.username}`
            info_mail.receivers = [data.email]
            info_mail.content = `
            <span>Hey ${data.name},</span>
            <br><br>
            <span>The OTP is <b>${data.otp_info.code}</b>. OTP is secret and can be used only once. Therefore, do not disclose this to anyone.</span>
            <br>
            <span>OTP is secret and can be used only once. Therefore, do not disclose this to anyone.</span>
            <br><br>
            <span>If you didn't request this, you can ignore this email or let us know.</span>
            <br><br>
            Thanks! 
            `
            break
        case 3:
            info_mail.title = `Alert - ${data.username}`
            info_mail.receivers = [data.email]
            info_mail.content = `
            <span>Hey ${data.name},</span>
            <br><br>
            <span><b>This is a alert</b></span><br>
            <span>Your account has been <b> ${User.STATUS_TEMPORARILY_LOCKED.name.toLowerCase()} </b>
            </span>
            <br><br>
            Thanks! 
            `
            break
        case 4:
            info_mail.title = `Alert - ${data.username}`
            info_mail.receivers = [data.email]
            info_mail.content = `
            <span>Hey ${data.name},</span>
            <br><br>
            <span><b>This is a alert</b></span><br>
            <span>Your account has been <b> ${User.STATUS_PERMANENTLY_LOCKED.name.toLowerCase()} </b>
            </span>
            <br><br>
            Thanks! 
            `
            break
        default:
            break
    }
    console.log("🚀 ~ file: mail-controller.js ~ line 84 ~ info_mail", info_mail)
    sendEmail(info_mail)
    return true
}