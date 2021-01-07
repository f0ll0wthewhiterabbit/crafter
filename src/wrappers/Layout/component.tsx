import React, { FC } from 'react'

import Copyright from './components/Copyright'
import Logo from './components/Logo'
import UserMenu from './components/UserMenu'
import { Wrapper, Header, Content, Footer } from './styles'

const LayoutWrapper: FC = ({ children }) => (
  <Wrapper>
    <Header>
      <Logo />
      <UserMenu />
    </Header>
    <Content>{children}</Content>
    <Footer>
      <Copyright />
    </Footer>
  </Wrapper>
)

export default LayoutWrapper
