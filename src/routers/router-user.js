"use strict";

const user = require('./../controller/user-controller')
const {
    validCreate,
    validSignIn,
} = require('./../validator/user-validator')
const {
    verifyToken,
    verifyTokenOTP,
} = require('../middleware/authentication')
module.exports = (router) => {
    router.route("/signup").post(validCreate, user.signUp)
    router.route("/signin").post(validSignIn, user.signIn)
    router.route("/verify-otp").post(verifyTokenOTP, user.verifyOTP)
    router.route("/users/:id").get(verifyToken, user.getDetail)

    return router
};