import { Request } from 'express'

export interface LoginResponse {
  accessToken: string
}

export interface RequestWithUser extends Request {
  user: {
    userId: string
    email: string
  }
}
