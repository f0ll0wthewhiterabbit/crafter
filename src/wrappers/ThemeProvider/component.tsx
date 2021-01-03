import React from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import { GlobalStyles } from './styles'

const theme: DefaultTheme = {
  colors: {
    background: {
      main: '#fafafa',
    },
    font: {
      regular: '#727272',
    },
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
