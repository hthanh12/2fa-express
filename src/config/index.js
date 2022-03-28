"use strict";

const dotenv = require("dotenv");

dotenv.config();
const env = process.env.NODE_ENV || "development";

//console.log(process)

const configs = {
    base: {
        env,
        rootUrl: process.env.ROOT_URL || "http://localhost:7070",
        name: process.env.APP_NAME || "nodejstest",
        host: process.env.APP_HOST || "0.0.0.0",
        port: process.env.APP_PORT || 7070,
        version: process.env.APP_VERSION || "1.0.0",
        utc: process.env.UTC || 7,
        language: process.env.LANGUAGE || "en",
        jwt_expiration: process.env.JWT_EXP || "1d",
        secret_key: process.env.SECRET_KEY || null,
        sendgrid_key: process.env.sendgrid_key || null,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_DRIVER: process.env.DB_DRIVER,
        DB_TIMEZONE: process.env.DB_TIMEZONE,
    },
};

let envConfig;

const config = Object.assign(configs.base, envConfig);

module.exports = config;