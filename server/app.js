import { PORT } from './config/index.js'
import router from './router/index.js'
import Koa from "koa"
import middleware from "./middleware/index.js"

const app = new Koa()
router(app)
middleware(app)

app.listen(PORT,async () => {
    console.log("server is working at http://localhost:9300")
})