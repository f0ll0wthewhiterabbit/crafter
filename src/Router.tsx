import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import AboutPage from '@/pages/About'
import HomePage from '@/pages/Home'
import Layout from '@/wrappers/Layout'
import { ROUTE_NAMES } from '@/constants/routeNames'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path={ROUTE_NAMES.HOME}>
            <HomePage />
          </Route>
          <Redirect to={ROUTE_NAMES.HOME} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default Router
