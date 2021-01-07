import React, { FC } from 'react'
import { Result, Button } from 'antd'
import { useHistory } from 'react-router-dom'

import { ROUTE_NAMES } from '@/constants/routeNames'

const ErrorPage: FC = () => {
  const history = useHistory()

  const redirectToHomePage = () => {
    history.push(ROUTE_NAMES.HOME)
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
