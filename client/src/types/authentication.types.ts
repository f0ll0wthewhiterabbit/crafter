export interface SignInForm {
  email: string
  password: string
  remember: boolean
}

export interface SignUpForm {
  email: string
  password: string
  passwordConfirm?: string
}
