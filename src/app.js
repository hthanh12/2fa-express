const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const response = require('./utils/response')
require("dotenv").config()

const PORT = process.env.PORT || 3100
const environment = process.env.NODE_ENV || "development"

app.use(cors({
        origin: process.env.WHITELIST
    }))
    .use(morgan('combined'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: false
    }))
    .use((error, req, res, next) => {
        if (error instanceof SyntaxError) {
            response.error(res, {
                status: 422,
                error: 'Body parse error',
            })
        } else {
            next()
        }
    })
    .use(cookieParser())

app.disable("x-powered-by")

require('./routers')(app)

app.listen(PORT, () => {
    console.info(`[ApiServer] Listening on Port ${PORT} / at ${environment} Env`)
})

app.get("/", (req, res) => {
    res.send(`Listening on Port ${PORT} / at ${environment} Env `)
})

app.get("/ping", (req, res) => {
    res.send({
        data: "Ok"
    })
})
module.exports = app