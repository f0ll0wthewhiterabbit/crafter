import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      font: {
        contrast: string
        error: string
      }
      icon: {
        form: string
        exclamation: string
      }
      background: {
        board: string
        footer: string
        unit: string
      }
      border: {
        board: string
        modal: string
      }
      accent: string
    }
  }
}