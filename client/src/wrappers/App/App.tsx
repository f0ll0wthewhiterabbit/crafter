import React from 'react'

import ThemeProvider from '@/wrappers/ThemeProvider'
import Router from '@/router/Router'

const App: React.FC = () => (
  <ThemeProvider>
    <Router />
  </ThemeProvider>
)

export default App
