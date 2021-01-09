import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      font: {
        contrast: string
        error: string
      }
      accent: string
      border: string
      formIcon: string
    }
  }
}
