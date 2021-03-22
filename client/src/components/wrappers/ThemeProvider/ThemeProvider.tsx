import React from 'react'
import { DefaultTheme, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

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
      loader: '#fff',
      badgeItem: '#e91cec',
      badgeRecipe: '#ff4d4f',
      dropOverlay: '#cedff9',
    },
    border: {
      board: '#d4dfe9',
      modal: '#f0f0f0',
    },
    disabledButton: 'rgba(0, 0, 0, 0.7)',
    accent: '#1890ff',
  },
}

const ThemeProvider: React.FC = ({ children }) => (
  <StyledComponentsThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      {children}
    </>
  </StyledComponentsThemeProvider>
)

export default ThemeProvider
