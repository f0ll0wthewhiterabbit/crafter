import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;

    *, 
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }

  body {
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.colors.font.regular};
    background: ${({ theme }) => theme.colors.background.main};
  }
`
