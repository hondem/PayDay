export type User = {
  id?: number,
  email?: string,
  password?: string,
  accessToken?: string
}

export type UserTokenPayload = {
  user: User,
  iat?: number,
  exp?: number
}

export type Users = User[]