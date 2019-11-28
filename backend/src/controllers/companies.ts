import CompaniesOperations from '../operations/companies'
import EmployeesOperations from '../operations/persons'

import Koa from 'koa'
import validate from '../validations'
import companiesSchemas from '../validations/schemas/companies'
import employeesSchemas from '../validations/schemas/employees'

import _ from 'lodash'


/**
 * Return all companies
 */
const getAll = async(ctx: Koa.Context) : Promise<any> => {
  ctx.body = await CompaniesOperations.getAll()
}

/**
 * Get certain company
 * @param ctx 
 */
const getById = async(ctx: Koa.Context) : Promise<any> => {
  const data = {
    id: parseInt(ctx.params.id)
  }

  validate(data, companiesSchemas.getById)
  ctx.body = await CompaniesOperations.getById(data.id)
}

/**
 * Create new company
 * @param ctx 
 */
const create = async(ctx: Koa.Context) : Promise<any> => {
  const data = {
    name: ctx.request.body.name
  }

  validate(data, companiesSchemas.create)
  ctx.body = await CompaniesOperations.create(data)
}

/**
 * Update existing company
 * @param ctx 
 */
const update = async(ctx: Koa.Context) : Promise<any> => {
  const data = {
    id: parseInt(ctx.params.id),
    name: ctx.request.body.name
  }

  validate(data, companiesSchemas.update)
  ctx.body = await CompaniesOperations.update(data)
}

/**
 * Creates new employee in company
 * @param ctx 
 */
const createEmployee = async(ctx: Koa.Context) : Promise<any> => {
  const data = _.clone(ctx.request.body)
  data.spolecnost = parseInt(ctx.params.companyId)

  validate(data, employeesSchemas.createPersonalData)
  ctx.body = await EmployeesOperations.create(data)
}

/**
 * Get employees within one company
 * @param ctx 
 */
const getEmployeesByCompany = async(ctx: Koa.Context) : Promise<any> => {
  const data = {
    companyId: parseInt(ctx.params.companyId)
  }

  validate(data, employeesSchemas.getEmployeesByCompany)
  ctx.body = await EmployeesOperations.getByCompany(data.companyId)
}

/**
 * Get certain employee in company
 * @param ctx 
 */
const getEmployeeByIdInCompany = async(ctx: Koa.Context) : Promise<any> => {
  const data = {
    companyId: parseInt(ctx.params.companyId),
    employeeId: parseInt(ctx.params.employeeId)
  }

  validate(data, employeesSchemas.getEmployeeByIdInCompany)
  ctx.body = await EmployeesOperations.getByIdInCompany(data.companyId, data.employeeId)
}

/**
 * Updates certain employee
 * @param ctx 
 */
const updateEmployee = async(ctx: Koa.Context) : Promise<any> => {
  const data = _.clone(ctx.request.body)
  data.companyId = parseInt(ctx.params.companyId)
  data.employeeId = parseInt(ctx.params.employeeId)

  validate(data, employeesSchemas.updatePersonalData)
  ctx.body = await EmployeesOperations.update(data)
}

/**
 * Remove employee
 * @param ctx 
 */
const removeEmployee = async(ctx: Koa.Context) : Promise<any> => {
  const data = {
    id: parseInt(ctx.params.employeeId)
  }

  validate(data, employeesSchemas.removeEmployee)
  ctx.body = await EmployeesOperations.remove(data.id)
}

export default {
  getAll,
  getById,
  create,
  update,
  createEmployee,
  getEmployeesByCompany,
  getEmployeeByIdInCompany,
  updateEmployee,
  removeEmployee
}