import React from 'react'

import ThemeProvider from '@/wrappers/ThemeProvider'
import Router from '@/Router'

const AppWrapper: React.FC = () => (
  <ThemeProvider>
    <Router />
  </ThemeProvider>
)

export default AppWrapper