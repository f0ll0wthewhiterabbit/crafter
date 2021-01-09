import React from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import { GlobalStyles } from './styles'

const theme: DefaultTheme = {
  colors: {
    font: {
      contrast: '#fff',
      error: '#ff4d4f',
    },
    accent: '#1890ff',
    border: '#dcdcdc',
    formIcon: ' rgba(0, 0, 0, 0.25)',
  },
}

const ThemeProviderWrapper: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      {children}
    </>
  </ThemeProvider>
)

export default ThemeProviderWrapper
