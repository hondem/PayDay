import UserModel from '../database/models/user'
import { IdOrIds, QueryBuilder } from 'objection'
import { User } from '../types/users'

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
const create = (user: User) : Promise<any> => {
  return UserModel.query().insertAndFetch(<any>user)
}

export = {
  getAll,
  getById,
  create
}