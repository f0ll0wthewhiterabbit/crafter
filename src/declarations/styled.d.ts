import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      font: {
        contrast: string
      }
      border: string
    }
  }
}
