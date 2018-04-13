import Router from 'koa-router'
import controller from '../controller/index.js'

const router = new Router()

export default (app) => {
	router.get("/",controller.index)
	app.use(router.routes())
	   .use(router.allowedMethods())
}