import React, { FC } from 'react'

import SignInForm from '@/pages/SignIn/components/SignInForm'
import { Wrapper, LoginIcon, Title } from './styles'

const SignInPage: FC = () => {
  return (
    <Wrapper>
      <LoginIcon />
      <Title>Sign in</Title>
      <SignInForm />
    </Wrapper>
  )
}

export default SignInPage
