import axios from 'axios'

import { BASE_API_URL } from '@/constants/endpoints.constants'
import { getAccessToken } from '@/utils/token'

export const apiClient = axios.create({
  baseURL: BASE_API_URL,
})

apiClient.interceptors.request.use((configParam) => {
  const config = configParam
  const accessToken = getAccessToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
