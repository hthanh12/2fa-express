"use strict";

const dotenv = require("dotenv");

dotenv.config();

function get_config(keyName, parseFunc) {
    if (!parseFunc)
        return process.env[keyName]
    return parseFunc(process.env[keyName])
}

exports.config = get_config