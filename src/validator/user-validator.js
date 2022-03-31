const Parameter = require('parameter')
let parameter = new Parameter()
const {
    User
} = require('../model')
const response = require('../utils/response')
const {
    patterns
} = require('../utils/helper')
const _ = require('lodash');
let ruleCreate = {
    username: {
        type: 'string',
        format: patterns.username
    },
    password: {
        type: 'string',
        format: patterns.password
    },
    mobile_number: {
        type: 'string',
        format: patterns.mobileNumber
    },
    email: {
        type: 'string',
        format: patterns.email
    },
    dob: {
        type: 'date',
        required: false
    },
    type: {
        type: 'enum',
        values: _.map(User.TYPES, 'value'),
    }
}

exports.validCreate = async (req, res, next) => {
    var errors = parameter.validate(ruleCreate, req.body)
    if (errors) {
        return response.badRequest(res, {
            error: errors,
        })
    }
    await next()
}
let ruleSignIn = {
    username: {
        type: 'string',
        format: patterns.username
    },
    password: {
        type: 'string',
        format: patterns.password
    }
}
exports.validSignIn = async (req, res, next) => {
    var errors = parameter.validate(ruleSignIn, req.body)
    if (errors) {
        return response.badRequest(res, {
            error: errors,
        })
    }
    await next()
}