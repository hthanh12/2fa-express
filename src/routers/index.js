'use strict';

const fs = require('fs');
const router = require('express').Router();

let routers = [];


//So we extract the middelware from router
// let middleware = [];
// routers.forEach((router) => {
//   middleware.push(router.routes())
//   middleware.push(router.allowedMethods())
// });

module.exports = (app) => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file.split('-')[0] == 'router' && file.slice(7, -3)) {
            console.log(file.split('-')[0])
            app.use(`/`, require(`./${file}`)(router));
        }
    });
    // for (let module of modules) {
    //     app.use(`/`, require(`./${module}`)(router));
    // }
};