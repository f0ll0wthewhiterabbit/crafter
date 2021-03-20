import jwtDecode from 'jwt-decode'

import { STORAGE_FIELDS } from '@/constants/storage.constants'
import { User } from '@/types/user.types'
import { AccessToken } from '@/types/token.types'

export function setAccessToken(accessToken: string): void {
  localStorage.setItem(STORAGE_FIELDS.TOKEN, accessToken)
}

export function clearAccessToken(): void {
  localStorage.removeItem(STORAGE_FIELDS.TOKEN)
}

export function getAccessToken(): string | null {
  const token = localStorage.getItem(STORAGE_FIELDS.TOKEN)

  return token || null
}

export const isAccessTokenExpired = (accessToken: string): boolean => {
  const decoded = jwtDecode(accessToken) as AccessToken
  const currentTime = Date.now() / 1000

  return decoded.exp < currentTime
}

export const getUserFromAccessToken = (accessToken: string): Pick<User, '_id' | 'email'> => {
  const { sub: _id, email } = jwtDecode(accessToken) as AccessToken

  return { _id, email }
}
