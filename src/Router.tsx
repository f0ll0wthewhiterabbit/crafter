import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import SignInPage from '@/pages/SignIn'
import SignUpPage from '@/pages/SignUp'
import HomePage from '@/pages/Home'
import ErrorPage from '@/pages/Error'
import Layout from '@/wrappers/Layout'
import { ROUTE_NAMES } from '@/constants/routeNames'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path={ROUTE_NAMES.HOME}>
            <HomePage />
          </Route>
          <Route exact path={ROUTE_NAMES.SIGN_UP}>
            <SignUpPage />
          </Route>
          <Route exact path={ROUTE_NAMES.SIGN_IN}>
            <SignInPage />
          </Route>
          <Route exact path={ROUTE_NAMES.ERROR}>
            <ErrorPage />
          </Route>
          <Redirect to={ROUTE_NAMES.ERROR} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default Router
