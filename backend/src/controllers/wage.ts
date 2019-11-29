import Koa from 'koa'
import Operations from '../operations/wage'
import validate from '../validations'
import schemas from '../validations/schemas/wage'
import _ from 'lodash'

// Get by employee 
// Get by employee and date
// Create for employee
// Remove by employee and date
// Patch by employee and date and data

/**
 * Get all wage records for employee
 * @param ctx 
 */
const getByEmployee = async(ctx: Koa.Context) => {
  const data = {
    companyId: parseInt(ctx.params.companyId),
    employeeId: parseInt(ctx.params.employeeId),
  }

  validate(data, schemas.getByEmployee)
  ctx.body = await Operations.getByEmployee(data)
}

/**
 * Get one certain wage for employee at specific date
 * @param ctx 
 */
const getByEmployeeAndDate = async(ctx: Koa.Context) => {
  const data = {
    companyId: parseInt(ctx.params.companyId),
    employeeId: parseInt(ctx.params.employeeId),
    date: ctx.params.date
  }

  validate(data, schemas.getByEmployeeAndDate)
  ctx.body = await Operations.getByEmployeeAndDate(data)
}

/**
 * Create new wage record
 * @param ctx 
 */
const create = async(ctx: Koa.Context) => {
  const data = _.clone(ctx.request.body)
  data.companyId = parseInt(ctx.params.companyId)
  data.employeeId = parseInt(ctx.params.employeeId)

  validate(data, schemas.create)
  ctx.body = await Operations.create(data)
}

export = {
  getByEmployee,
  getByEmployeeAndDate,
  create
}
