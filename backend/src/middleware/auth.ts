import errors from '../utils/errors'
import { Context } from 'koa'
import operations from '../operations/users'

const authorize = async(ctx: Context, next) => {
  if(!ctx.header.authorization) throw new errors.AuthorizationError('I NEED AUTHORIZATION TOKEN YOU MORRON! 😡')
  const data = await operations.verifyTokenPayload(ctx.header.authorization)

  if (ctx.response && data.loginTimeout) ctx.set('Login-timeout', data.loginTimeout.toString())
  ctx.state.user = data.user
  
  return next()
}

export = authorize