import UsersRepository from '../repository/users'
import { IdOrIds } from 'objection'

import crypto from '../utils/crypto'
import { User, Users } from '../types/users'

/**
 * Returns all users
 */
const getAll = async() : Promise<Users> => {
  const users: Users = await UsersRepository.getAll()
  users.map((user) => { delete user.password })
  return users
}

/**
 * Get user by Id
 * @param id 
 */
const getById = async(id: IdOrIds) : Promise<User> => {
  const user: User = await UsersRepository.getById(id)
  delete user.password
  return user
}

/**
 * Create new user
 * @param user 
 */
const create = async(user: User) : Promise<User> => {
  user.password = await crypto.hash(user.password)

  const createdUser: User = await UsersRepository.create(user)
  const accessToken: string = await crypto.generateToken(createdUser)
  
  createdUser.accessToken = accessToken
  delete createdUser.password
  return createdUser
}

export = {
  getAll,
  getById,
  create
}