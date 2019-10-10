import ErrorsUtil from '../utils/errors'
import { Context } from 'koa'
import Config from '../config'
import logger from '../utils/logger'

const errorMiddleware = async(ctx: Context, next) => {
  try{
    return await next()
  } catch(err){
    if(!(err instanceof ErrorsUtil.AppError)){
      err = new ErrorsUtil.InternalError()
    }

    ctx.status = err.code
    ctx.body = {
      type: err.type,
      message: err.message
    }

    if(Config.env == 'local') ctx.body.stack = err.stack

    logger.error({
      code: err.code,
      type: err.type,
      message: err.message,
      stack: err.stack
    })
  }
}

const notFound = async(ctx: Context, next) => {
  const err = new ErrorsUtil.NotFound()

  ctx.status = err.code
  ctx.body = {
    type: err.type,
    message: err.message
  }

  if(Config.env == 'local') ctx.body.stack = err.stack

  logger.error({
    code: err.code,
    type: err.type,
    message: err.message,
    stack: err.stack
  })
}

export = {
  errorMiddleware,
  notFound
}