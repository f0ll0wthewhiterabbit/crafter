import React from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import { GlobalStyles } from './styles'

const theme: DefaultTheme = {
  colors: {
    font: {
      contrast: '#fff',
    },
    border: '#dcdcdc',
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
