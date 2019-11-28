import PersonsRepository from '../repository/persons'
import { IdOrIds } from 'objection'
import errors from '../utils/errors'

import EmployeesUtils from '../utils/employees'
import CompaniesOperations from './companies'

/**
 * Get employees in company
 * @param id 
 */
const getByCompany = async(id: IdOrIds) : Promise<any> => {
  const company = await CompaniesOperations.getById(id)
  if(!company) throw new errors.NotFound(errors.COMPANY_NOT_FOUND, "Given compaany doesn't exist")
  return (await PersonsRepository.getByCompany(id)).map(employee => { return EmployeesUtils.plainObjectToNested(employee) })
}

/**
 * Get certain employee in company
 * @param companyId 
 * @param employeeId 
 */
const getByIdInCompany = async(companyId: IdOrIds, employeeId: IdOrIds) => {
  const company = await CompaniesOperations.getById(companyId)
  if(!company) throw new errors.NotFound(errors.COMPANY_NOT_FOUND, "Given compaany doesn't exist")

  const employee = await PersonsRepository.getByIdInCompany(companyId, employeeId)
  if(!employee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Given employee was not found")

  return EmployeesUtils.plainObjectToNested(employee)
}

/**
 * Creates new person in database
 * @param person
 */
const create = async(person) : Promise<any> => {
  const data = EmployeesUtils.nestedObjectToPlain(person)
  const company = await CompaniesOperations.getById(data.spolecnost)
  if(!company) throw new errors.NotFound(errors.COMPANY_NOT_FOUND, "Given company doesn't exist")
  return EmployeesUtils.plainObjectToNested(await PersonsRepository.create(data))
}

/**
 * Updates employee data
 * @param person 
 */
const update = async(person) : Promise<any> => {
  const companyId = person.companyId
  const employeeId = person.employeeId
  delete person.companyId
  delete person.employeeId

  const company = await CompaniesOperations.getById(companyId)
  if(!company) throw new errors.NotFound(errors.COMPANY_NOT_FOUND, "Given compaany doesn't exist")

  const employee = await PersonsRepository.getByIdInCompany(companyId, employeeId)
  if(!employee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Given employee was not found")

  const data = EmployeesUtils.nestedObjectToPlain(person)
  return EmployeesUtils.plainObjectToNested(await PersonsRepository.update(employeeId, data))
}

/**
 * Remove certaian employee
 * @param person 
 */
const remove = async(id: IdOrIds) : Promise<any> => {
  const employee = await PersonsRepository.getById(id)
  if(!employee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Given employee was not found")

  // TODO: Check permissions!
  // TODO: Remove row in `udaje` table!
  return PersonsRepository.remove(id)
}

export = {
  create,
  update,
  getByCompany,
  getByIdInCompany,
  remove
}