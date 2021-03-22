import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { Result, Button } from 'antd'

import { RootState } from '@/store/rootReducer'

import { ROUTE_NAMES } from '@/router/routes.constants'

const ErrorPage: FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { isInitialized } = useSelector((state: RootState) => state.auth)
  const history = useHistory()

  const redirectToHomePage = () => {
    history.push(ROUTE_NAMES.HOME)
  }

  if (!isAuthenticated && isInitialized) {
    return <Redirect to={ROUTE_NAMES.SIGN_IN} />
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={redirectToHomePage}>
          Back Home
        </Button>
      }
    />
  )
}

export default ErrorPage
