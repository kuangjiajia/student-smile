import { STATICPATH } from '../config/index.js'


const bodyParser = require('koa-bodyparser')
const static = require("koa-static")
const path = require("path")


module.exports = (app) => {
    app.use(bodyParser())
    // app.use(static(path.resolve(__dirname)))
}