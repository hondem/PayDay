import WageRepository from '../repository/wage'
import { IdOrIds } from 'objection'
import { Company } from '../types/companies'
import errors from '../utils/errors'

import EmployeesOperations from './persons'

// Get by employee 
// Get by employee and date
// Create for employee
// Remove by employee and date
// Patch by employee and date and data

/**
 * Get records by employee
 * @param employee 
 */
const getByEmployee = async(employee) => {
  const foundEmployee = await EmployeesOperations.getByIdInCompany(employee.companyId, employee.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee not found")

  return WageRepository.getByEmployee(employee.employeeId)
}

/**
 * Get one certain record
 * @param employee 
 */
const getByEmployeeAndDate = async(data) => {
  const foundEmployee = await EmployeesOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee not found")

  const wage = await WageRepository.getByEmployeeAndDate(foundEmployee.id, data.date)
  if(!wage) throw new errors.NotFound(errors.WAGE_NOT_FOUND, "Wage record was not found")
  return wage
}

/**
 * Create new wage record
 * @param data 
 */
const create = async(data) => {
  const foundEmployee = await EmployeesOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee not found")

  const wage = await WageRepository.getByEmployeeAndDate(foundEmployee.id, data.platnost_od)
  if(wage) throw new errors.NotFound(errors.WAGE_ALREADY_EXISTS, "Wage record for this day already exists!")

  delete data.companyId
  delete data.employeeId
  data.id = foundEmployee.id

  return WageRepository.create(data)
}

/**
 * Update wage record
 * @param data 
 */
const update = async(data) => {
  const foundEmployee = await EmployeesOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee not found")

  const wage = await WageRepository.getByEmployeeAndDate(foundEmployee.id, data.date)
  if(!wage) throw new errors.NotFound(errors.WAGE_NOT_FOUND, "Wage record was not found")

  const companyId = data.companyId
  const employeeId = data.employeeId
  const date = data.date

  delete data.companyId
  delete data.employeeId
  delete data.date

  return WageRepository.update(employeeId, date, data)
}

export = {
  getByEmployee,
  getByEmployeeAndDate,
  create,
  update
}