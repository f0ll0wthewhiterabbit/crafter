const isProduction = process.env.NODE_ENV === 'production'

export const BASE_API_URL = isProduction ? '/api' : 'http://localhost:3000/api'
export const BASE_WEB_SOCKET_URL = isProduction ? '/' : 'ws://localhost:3000'
