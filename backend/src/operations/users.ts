import UsersRepository from '../repository/users'
import { IdOrIds } from 'objection'

import crypto from '../utils/crypto'

/**
 * Returns all users
 */
const getAll = () : Promise<any> => {
  return UsersRepository.getAll()
}

/**
 * Get user by Id
 * @param id 
 */
const getById = (id: IdOrIds) : Promise<any> => {
  return UsersRepository.getById(id)
}

/**
 * Create new user
 * @param user 
 */
const create = async(user) => {
  user.password = await crypto.hash(user.password)
  const createdUser = await UsersRepository.create(user)
  const accessToken = await crypto.generateToken(createdUser)
  createdUser.accessToken = accessToken
  return createdUser
}

export = {
  getAll,
  getById,
  create
}