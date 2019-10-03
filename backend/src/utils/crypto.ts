import Crypto from 'crypto'
import Config from '../config'
import bcrypt from 'bcryptjs'
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'

/**
 * Pepperifies password
 * @param password 
 */
const pepperify = (password: string) => {
  return Crypto.createHmac('sha256', Config.security.secretHash).update(password).digest('hex')
}

/**
 * Creates hash for password
 * @param password 
 */
const hash = (password: string) : Promise<string> => {
  return bcrypt.hash(pepperify(password), Config.security.saltRounds)
}

/**
 * Compares two passwords
 * @param hashedPassword 
 * @param password 
 */
const compare = (hashedPassword: string, password: string) => {
  return bcrypt.compare(pepperify(password), hashedPassword)
}

/**
 * Generates new user's JWT
 * @param userEmail 
 */
const generateToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ user }, Config.security.secretHash, <SignOptions>Config.security.jwtInputSettings, (err, res) => {
      if(err) reject(err)
      else resolve(res)
    })
  })
}

/**
 * Verify user's token
 * @param token 
 */
const verifyToken = async(token) => {
  try{
    return await new Promise((resolve, reject) => {
      jwt.verify(token, Config.security.secretHash, <VerifyOptions>Config.security.jwtOutputSettings, (err, res) => {
        if(err) reject(err)
        else resolve(res)
      })
    })
  } catch(err){
    throw new Error('You are not permited to do this operation')
  }
}

export = {
  pepperify,
  hash,
  compare,
  generateToken,
  verifyToken
}