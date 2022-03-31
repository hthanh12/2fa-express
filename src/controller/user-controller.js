const {
    User
} = require('../model')
const response = require('../utils/response')
const {
    Op
} = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
    config
} = require('../config')
const {
    renderLogInfo,
    ACTION
} = require('../utils/helper')
const moment = require('moment')
exports.signUp = async (req, res) => {
    let {
        username,
        password,
        mobile_number,
        email,
        name,
        dob,
        type,
    } = req.body
    let isCheckDuplicateUser = await checkDuplicateUser(req.body)
    if (isCheckDuplicateUser) {
        return response.conflict(res, {
            message: 'Conflict'
        })
    }

    let dataInsert = {
        username: username,
        password: await hashPWD(password),
        mobile_number: mobile_number,
        email: email,
        name: name || '',
        dob: dob || '',
        type: type || User.TYPE_MEMBER,
        status: User.STATUS_ACTIVE,
        logs: {
            list: [renderLogInfo(User.STATUS_ACTIVE), renderLogInfo(ACTION.CREATE)]
        },
        login_info: {
            wrong_pwd: [],
            wrong_otp: [],
        }
    }

    let data = null
    try {
        data = await User.create(dataInsert)
    } catch (error) {
        console.log('Signup Error', error)
        return response.internalServerError(res, {
            error: 'Internal Server Error',
            message: err.toString()
        })
    }

    data = await User.getOne(data.id)
    return response.created(res, {
        data: data
    })
}

let checkDuplicateUser = async (dataCheck) => {
    let {
        username,
        email,
        mobile_number,
    } = dataCheck
    let data = await User.findOne({
        where: {
            [Op.or]: [{
                username: username
            }, {
                email: email
            }, {
                mobile_number: mobile_number
            }]
        }
    })

    if (data) return true
    return false
}

let hashPWD = async (password) => {
    return bcrypt.hash(password, config('SALT_ROUND', parseInt))
}
exports.signIn = async (req, res) => {
    let {
        username,
        password
    } = req.body

    let findData = await User.findOne({
        where: {
            username: username
        },
        attributes: ['id', 'password', 'username', 'login_info', 'otp_info']
    })
    if (!findData) {
        return response.notFound(res, {
            error: 'Not found username'
        })
    }

    const isMatchPWD = await bcrypt.compare(password, findData.password)
    if (!isMatchPWD) {
        updateUserWrongPWD(findData)
        return response.unauthorized(res, {
            error: 'Wrong password'
        })
    }

    let tokenOTP = generateOTPToken({
        id: findData.id
    })

    let otp = generateOTP()

    console.log('123123')
    updateUser(findData.id, {
        login_info: {
            ...findData.login_info,
            wrong_pwd: [],
            wrong_otp: [],
        },
        otp_info: {
            code: otp,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        }
    })
    console.log('4564356456')

    return response.ok(res, {
        data: {
            id: findData.id,
            token_otp: tokenOTP
        }
    })
    console.log('78978')

}

let generateAccessToken = (dataSign) => {
    return jwt.sign(dataSign, config('JWT_SECRET_KEY', String), {
        expiresIn: config('JWT_EXP', String),
        algorithm: config('JWT_ALG', String)
    })
}

let generateOTPToken = (dataSign) => {
    return jwt.sign(dataSign, config('JWT_SECRET_KEY', String), {
        expiresIn: config('JWT_EXP_OTP', String),
        algorithm: config('JWT_ALG', String)
    })
}

let updateUserWrongPWD = async (data) => {
    try {
        let dataUpdate = {
            login_info: data.login_info
        }

        dataUpdate.login_info.wrong_pwd.push(moment().format('YYYY-MM-DD HH:mm:ss'))

        if (dataUpdate.login_info.wrong_pwd.length == config('TIMES_WRONG_PWD', parseInt)) dataUpdate.status = User.STATUS_TEMPORARILY_LOCKED

        await User.update(dataUpdate, {
            where: {
                id: data.id
            }
        })
    } catch (error) {
        console.log('updateUserWrongPWD', error)
        return error
    }
}

let updateUserWrongOTP = async (data) => {
    try {
        let dataUpdate = {
            login_info: data.login_info
        }

        dataUpdate.login_info.wrong_otp.push(moment().format('YYYY-MM-DD HH:mm:ss'))

        if (dataUpdate.login_info.wrong_otp.length == config('TIMES_WRONG_OTP', parseInt)) dataUpdate.status = User.STATUS_PERMANENTLY_LOCKED

        await User.update(dataUpdate, {
            where: {
                id: data.id
            }
        })
    } catch (error) {
        console.log('updateUserWrongPWD', error)
        return error
    }
}

let updateUser = async (id, values = {}) => {
    try {
        let {
            token_info,
            login_info,
            otp_info,
        } = values
        if (values == '{}') return true
        console.log("🚀 ~ file: user-controller.js ~ line 203 ~ updateUser ~ values", values)
        console.log("🚀 ~ file: user-controller.js ~ line 203 ~ updateUser ~ id", id)
        await User.update({
            token_info,
            login_info,
            otp_info,
        }, {
            where: {
                id: id
            }
        })
        return true
    } catch (error) {
        console.log('updateUser', error)
        return error
    }
}
let generateOTP = () => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < config('LENGTH_OTP', parseInt); i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP
}
exports.getDetail = async (req, res) => {
    let {
        id
    } = req.params
    let user = req.user

    if (user.id != id && user.type != User.TYPE_ADMIN) {
        return response.forbidden(res, {
            error: 'Not permission'
        })
    }

    let data = await User.getOne(id)
    return response.success(res, {
        data: data
    })
}

exports.verifyOTP = async (req, res) => {
    let user = req.user
    let {
        otp
    } = req.body

    let findData = await User.findOne({
        where: {
            id: user.id
        },
        attributes: ['id', 'login_info', 'otp_info']
    })
    if (!findData) {
        return response.notFound(res, {
            error: 'Not found username'
        })
    }

    if (findData.otp_info && !findData.otp_info.code) {
        return response.unauthorized(res, {
            error: 'Not found otp_info code'
        })
    }

    const isCheckOTP = otp == findData.otp_info.code ? true : false
    if (!isCheckOTP) {
        updateUserWrongOTP(findData)
        return response.unauthorized(res, {
            error: 'Wrong OTP'
        })
    }

    let token = generateAccessToken({
        id: findData.id
    })

    updateUser(findData.id, {
        login_info: {
            ...findData.login_info,
            wrong_pwd: [],
            wrong_otp: [],
        },
        otp_info: {},
        token_info: {
            web: {
                token: token
            }
        }
    })

    return response.ok(res, {
        data: {
            id: findData.id,
            token: token
        }
    })
}