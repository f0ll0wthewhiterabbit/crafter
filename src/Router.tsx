import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import AboutPage from '@/pages/About'
import HomePage from '@/pages/Home'
import Header from '@/components/Header'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
