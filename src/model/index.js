const {
    Sequelize
} = require('sequelize')
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const db = {}
const {
    config
} = require('../config')

const sequelize = new Sequelize(config('DB_NAME'), config('DB_USERNAME'), config('DB_PASSWORD'), {
    host: config('DB_HOST'),
    dialect: config('DB_DRIVER'),
    port: config('DB_PORT'),
    dialectOptions: {
        useUTC: false, //for reading from database
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 80000,
    },
})




sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
}).catch(error => {
    console.error('Unable to connect to the database:', error)
})

fs.readdirSync(__dirname)
    .filter(file => (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    ))
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        // console.log(model)
        db[model.name] = model
    })

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db