import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import ThemeProvider from '@/wrappers/ThemeProvider'
import Router from '@/router/Router'
import { signInRequest } from '@/store/authSlice'

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(signInRequest(true))
  }, [dispatch])

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  )
}

export default App
