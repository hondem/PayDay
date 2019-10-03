import Koa from 'koa'

/**
 * Return all users
 * @param ctx 
 */
const getAll = async(ctx: Koa.Context) => {
  ctx.body = "Ahoooj"
  ctx.status = 200
}

export default {
  getAll
}