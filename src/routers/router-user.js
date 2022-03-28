"use strict";

const user = require('./../controller/user');

module.exports = (router) => {
    router.route("/signup").post(user.create)

    return router;
};