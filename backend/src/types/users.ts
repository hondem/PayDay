export type User = {
  id?: number,
  authLevel?: 'admin' | 'accountant' |'user',
  email?: string,
  password?: string,
  accessToken?: string,
}

export type UserTokenPayload = {
  user: User,
  iat?: number,
  exp?: number
}

export type Users = User[]