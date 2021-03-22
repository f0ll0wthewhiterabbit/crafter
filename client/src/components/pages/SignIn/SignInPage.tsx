import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'

import SignInForm from '@/components/pages/SignIn/components/SignInForm'
import { RootState } from '@/store/rootReducer'
import { signOutRequest } from '@/store/authSlice'
import { ROUTE_NAMES } from '@/router/routes.constants'

import { Wrapper, LoginIcon, Title } from './styles'

const SignInPage: FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(signOutRequest())
  }, [dispatch])

  if (isAuthenticated) {
    return <Redirect to={ROUTE_NAMES.HOME} />
  }

  return (
    <Wrapper>
      <LoginIcon />
      <Title>Sign in</Title>
      <SignInForm />
    </Wrapper>
  )
}

export default SignInPage
