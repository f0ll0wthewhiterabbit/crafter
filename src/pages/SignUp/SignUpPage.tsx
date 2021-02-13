import React, { FC } from 'react'

import SignUpForm from '@/pages/SignUp/components/SignUpForm'
import { Wrapper, SignUpIcon, Title } from './styles'

const SignUpPage: FC = () => {
  return (
    <Wrapper>
      <SignUpIcon />
      <Title>Sign up</Title>
      <SignUpForm />
    </Wrapper>
  )
}

export default SignUpPage
