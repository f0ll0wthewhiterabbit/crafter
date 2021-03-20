import { MongoDBResponse } from '@/types/response.types'

export interface User extends MongoDBResponse {
  _id: string
  email: string
}

export interface UserForm {
  email: string
  password: string
  passwordConfirm?: string
}
