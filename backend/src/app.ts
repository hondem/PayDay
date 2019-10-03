import * as Koa from 'koa'
import * as Router from 'koa-router'

const app = new Koa()
const router = new Router()

router.get("/", async (ctx, next) => {
  ctx.body = { msg: "Hello more" }
  return await next()
})

app.use(router.routes())

app.listen(3000, () => {
  console.log("Koa started")
})

export default app