export interface User {
  token: string
  refresh_token: string
  expire_in: number
  refresh_expire_in: number
}

export interface Token {
  isLoggedIn: boolean
  token: string
  refreshToken: string
  expireIn: number
  refreshExpireIn: number
  username: string
}
