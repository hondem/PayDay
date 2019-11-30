import FolderModel from '../database/models/folder'
import { IdOrIds } from 'objection'
import Moment from 'moment'

/**
 * Return all folder records in database
 */
const getAll = () => {
  return FolderModel.query()
}

/**
 * Return one certain row
 * @param id 
 */
const getById = (id: IdOrIds) => {
  return FolderModel.query().findById(id)
}

/**
 * Get all records of employee
 * @param employeeId 
 */
const getByEmployeeId = (employeeId: IdOrIds) => {
  return FolderModel.query().where('os_id', employeeId)
}

/**
 * Get all records within one month of certain employee
 * @param employeeId 
 * @param month 
 */
const getByEmployeeIdAndMonth = (employeeId: IdOrIds, date: string) => {
  const startOfMonth = Moment(date).startOf('month').format('YYYY-MM-DD')
  const endOfMonth = Moment(date).endOf('month').format('YYYY-MM-DD')

  // return (
  //   (start1 < end2 && start1 >= start2) 
  //   ||
  //   (start2 < end1 && start2 >= start1)
  // );

  return FolderModel.query().where('os_id', employeeId).andWhere(function(){
    this.where(function(){
      this.where("datum_do", ">", startOfMonth).andWhere("datum_od", "<=", startOfMonth)
    }).orWhere(function(){
      this.where("datum_od", "<", endOfMonth).andWhere("datum_od", ">=", startOfMonth)
    })
  })

  return FolderModel.query().whereBetween(date, [startOfMonth, endOfMonth]).andWhere('os_id', employeeId)
}

/**
 * Create new record
 * @param data 
 */
const create = (data) => {
  return FolderModel.query().insertAndFetch(data)
}

/**
 * Update certain folder record
 * @param id 
 * @param data 
 */
const update = (id: IdOrIds, data) => {
  return FolderModel.query().patchAndFetchById(id, data)
}

/**
 * Remove certain folder record
 * @param id 
 */
const remove = (id: IdOrIds) => {
  return FolderModel.query().deleteById(id)
}

export = {
  getAll,
  getById,
  getByEmployeeId,
  getByEmployeeIdAndMonth,
  create,
  update,
  remove
}