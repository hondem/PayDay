import UserModel from '../database/models/user'
import { IdOrIds } from 'objection'

/**
 * Return all users
 */
const getAll = () : Promise<any> => {
  return UserModel.query()
}

/**
 * Returns user by ID
 * @param id 
 */
const getById = (id: IdOrIds) : Promise<any> => {
  return UserModel.query().findById(id)
}

/**
 * Creates user
 * @param user 
 */
const create = (user) : Promise<any> => {
  return UserModel.query().insertAndFetch(user)
}

export = {
  getAll,
  getById,
  create
}