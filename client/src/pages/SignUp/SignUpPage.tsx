import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'

import SignUpForm from '@/pages/SignUp/components/SignUpForm'
import { signOutRequest } from '@/store/authSlice'
import { ROUTE_NAMES } from '@/router/routes.constants'
import { RootState } from '@/store/rootReducer'

import { Wrapper, SignUpIcon, Title } from './styles'

const SignUpPage: FC = () => {
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
      <SignUpIcon />
      <Title>Sign up</Title>
      <SignUpForm />
    </Wrapper>
  )
}

export default SignUpPage
