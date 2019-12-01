import SalaryRepository from '../repository/salary'
import errors from '../utils/errors'

import EmployeesOperations from './persons'

/**
 * Get salaries by employee id
 * @param data 
 */
const getByEmployeeId = async(data) => {
  const foundEmployee = await EmployeesOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee was not found")

  return SalaryRepository.getByEmployeeId(data.employeeId)
}

/**
 * Return one certain salaryr record
 * @param data 
 */
const getByEmployeeIdAndDate = async(data) => {
  const foundEmployee = await EmployeesOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee was not found")

  const foundSalary = await SalaryRepository.getByEmployeeIdAndDate(data.employeeId, data.date)
  if(!foundSalary) throw new errors.NotFound(errors.SALARY_NOT_FOUND, "Salary record not found in database")

  return foundSalary
}

export = {
  getByEmployeeId,
  getByEmployeeIdAndDate
}