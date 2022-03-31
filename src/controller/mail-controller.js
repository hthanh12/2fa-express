const {
    config
} = require('../config')
const moment = require('moment')
const nodemailer = require('nodemailer')

const nodemailerSendGrid = require('nodemailer-sendgrid')

let sendEmail = async (info_mail) => {
    const transporter = nodemailer.createTransport(
        nodemailerSendGrid({
            apiKey: config('SENDGRID_KEY', String)
        })
    )
    try {
        await transporter.sendMail({
            from: `${config('EMAIL_NAME_ACCOUNT_SEND',String)} <${config('EMAIL_ACCOUNT_SEND',String)}>`,
            to: info_mail.receivers,
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
    let info_mail = {
        subject: '',
        content: '',
        receivers: [],
    }
    switch (type) {
        case 1:
            info_mail.subject = `Email Verification`
            info_mail.receivers = [data.email]
            info_mail.content = `
            <span>Hey ${data.name},</span>
            <br><br>
            <span>The OTP is <b>${otpInfo.code}</b>. OTP is secret and can be used only once. Therefore, do not disclose this to anyone.</span>
            <br>
            <span>OTP is secret and can be used only once. Therefore, do not disclose this to anyone.</span>
            <br><br>
            <span>If you didn't request this, you can ignore this email or let us know.</span>
            <br><br>
            Thanks! 
            `
            break
        case 2:
            info_mail.subject = `Notification =`
            info_mail.receivers = [data.email]
            info_mail.content = `
            <span>Hey ${data.name},</span>
            <br><br>
            <span>The OTP is <b>${otpInfo.code}</b>. OTP is secret and can be used only once. Therefore, do not disclose this to anyone.</span>
            <br>
            <span>OTP is secret and can be used only once. Therefore, do not disclose this to anyone.</span>
            <br><br>
            <span>If you didn't request this, you can ignore this email or let us know.</span>
            <br><br>
            Thanks! 
            `
            break
        case 3:
            info_mail.subject = `Notification = - == =`
            info_mail.receivers = [data.email]
            info_mail.content = `
            <span>Hey ${data.name},</span>
            <br><br>
            <span>The OTP is <b>${otpInfo.code}</b>. OTP is secret and can be used only once. Therefore, do not disclose this to anyone.</span>
            <br>
            <span>OTP is secret and can be used only once. Therefore, do not disclose this to anyone.</span>
            <br><br>
            <span>If you didn't request this, you can ignore this email or let us know.</span>
            <br><br>
            Thanks! 
            `
            break
        default:
            break
    }

    return content
}