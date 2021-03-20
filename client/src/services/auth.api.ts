import { apiClient } from '@/utils/api'
import { User, UserForm } from '@/types/user.types'
import { SignInResponse } from '@/types/response.types'

export const authService = {
  async signIn(userValues: Pick<UserForm, 'email' | 'password'>): Promise<SignInResponse> {
    const { data: accessToken } = await apiClient.post('/auth/login', userValues)

    return accessToken
  },

  async signUp(userValues: Pick<UserForm, 'email' | 'password'>): Promise<User> {
    const { data: user } = await apiClient.post('/users', userValues)

    return user
  },
}
