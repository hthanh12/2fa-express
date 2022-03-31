const {
    config
} = require("../config")
const jwt = require("jsonwebtoken")
const {
    User
} = require("../model")
const response = require("../utils/response")

exports.verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1]
        if (token == null)
            return response.unauthorized(res, {
                error: "Unauthorized"
            })
        let tokenInfo
        await new Promise((resolve, reject) => {
            jwt.verify(token, config('JWT_SECRET_KEY', String), (err, decoded) => {
                if (err) {
                    console.log(err)
                    return response.unauthorized(res, {
                        error: "Token is invalid"
                    })
                }
                console.log("verify token done")
                tokenInfo = decoded
                resolve(tokenInfo)
            })
        })
        let user = await User.findByPk(tokenInfo.id, {
            attributes: {
                excludes: ['logs', 'password']
            }
        })

        if (!user) return response.notFound(res, {
            error: "Not found user"
        })

        let tokenVerify = user.token_info && user.token_info.web && user.token_info.web.token ? user.token_info.web.token : '-'
        if (tokenVerify != token) return response.unauthorized(res, {
            error: "Token is invalid"
        })
        req.user = user
        await next()
    } catch (error) {
        return response.error(res, {
            error: error
        })
    }
}

exports.verifyTokenOTP = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1]
        if (token == null)
            return response.unauthorized(res, {
                error: "Unauthorized"
            })
        let tokenInfo
        await new Promise((resolve, reject) => {
            jwt.verify(token, config('JWT_SECRET_KEY', String), (err, decoded) => {
                if (err) {
                    console.log(err)
                    return response.unauthorized(res, {
                        error: "Token is invalid"
                    })
                }
                console.log("verify token done")
                tokenInfo = decoded
                resolve(tokenInfo)
            })
        })
        let user = await User.findByPk(tokenInfo.id, {
            attributes: {
                excludes: ['logs', 'password']
            }
        })
        if (!user) return response.notFound(res, {
            error: "Not found user"
        })
        req.user = user
        await next()
    } catch (error) {
        return response.error(res, {
            error: error
        })
    }
}