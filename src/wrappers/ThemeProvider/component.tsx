import React from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import { GlobalStyles } from './styles'

const theme: DefaultTheme = {
  colors: {
    font: {
      contrast: '#fff',
      error: '#ff4d4f',
    },
    icon: {
      form: 'rgba(0, 0, 0, 0.25)',
      exclamation: '#faad14',
    },
    background: {
      board: '#e7effb',
      footer: '#001529',
      unit: '#fff',
    },
    border: {
      board: '#d4dfe9',
      modal: '#f0f0f0',
    },
    accent: '#1890ff',
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
