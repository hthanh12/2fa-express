const Sequelize = require('sequelize')
const config = require('../config')
console.log("🚀 ~ file: db.js ~ line 3 ~ config", config)

const DB = new Sequelize(
    config['DB_NAME'],
    config['DB_USERNAME'],
    config['DB_PASSWORD'], {
    host: config['DB_HOST'],
    dialect: config['DB_DRIVER'],
    port: config['DB_PORT'],
    dialectOptions: {
        useUTC: false, //for reading from database
    },
    timezone: config['DB_TIMEZONE'], //for writing to database
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 80000,
    },
});
DB
    .authenticate()
    .then(() => {
        console.log(`Connection(${config['DB_DRIVER']}) has been established successfully.`);
    })
    .catch(err => {
        console.log(`(${config['DB_DRIVER']}) Unable to connect to the database: \n%o`, err);
    });

exports = DB;
