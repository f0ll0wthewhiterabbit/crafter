import axios from 'axios'

import { API_URLS } from '@/constants/endpoints.constants'
import { getAccessToken } from '@/utils/token'

const isProduction = process.env.NODE_ENV === 'production'
export const BASE_URL = isProduction ? API_URLS.PRODUCTION : API_URLS.DEVELOPMENT

export const apiClient = axios.create({
  baseURL: BASE_URL,
})

apiClient.interceptors.request.use((configParam) => {
  const config = configParam
  const accessToken = getAccessToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
