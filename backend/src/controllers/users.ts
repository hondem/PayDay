import Koa from 'koa'
import Operations from '../operations/users'
import validate from '../validations'
import schemas from '../validations/schemas/users'

/**
 * Return all users
 * @param ctx 
 */
const getAll = async(ctx: Koa.Context) => {
  ctx.body = await Operations.getAll()
}

/**
 * Get user by ID
 * @param ctx 
 */
const getById = async(ctx: Koa.Context) => {
  const data = {
    id: parseInt(ctx.params.id)
  }

  validate(data, schemas.getById)

  ctx.body = await Operations.getById(data.id)
}

/**
 * Create new user
 * @param ctx 
 */
const create = async(ctx: Koa.Context) => {
  const data = {
    email: ctx.request.body.email,
    password: ctx.request.body.password
  }

  validate(data, schemas.create)

  ctx.body = await Operations.create(data)
}

export default {
  getAll,
  getById,
  create
}