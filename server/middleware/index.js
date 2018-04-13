import bodyParser from "koa-bodyparser"
import staticPath from "koa-static"
import path from "path"
import intercept from "./intercept/index.js"

module.exports = (app) => {
    app.use(bodyParser())
    app.use(staticPath(path.resolve("../../build")))
    app.use(intercept())
}