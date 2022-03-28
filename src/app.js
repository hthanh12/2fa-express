const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');

require("dotenv").config();

const PORT = process.env.PORT || 3100;
const environment = process.env.NODE_ENV || "development";

app.use(cors({
    origin: process.env.WHITELIST
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send(`Listening on Port ${PORT} / at ${environment} Env `);
});

app.get("/ping", (req, res) => {
    res.send({
        data: "Ok"
    });
});
// CORS ALL ACCESS
app.disable("x-powered-by");

require('./routers')(app);

app.listen(PORT, () => {
    console.info(`[ApiServer] Listening on Port ${PORT} / at ${environment} Env`);
});

module.exports = app;