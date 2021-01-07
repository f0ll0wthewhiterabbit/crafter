import React, { FC } from 'react'
import { Layout } from 'antd'

import Copyright from './components/Copyright'
import Logo from './components/Logo'
import UserMenu from './components/UserMenu'
import { Wrapper, Header, Footer } from './styles'

const { Content: AntdContent } = Layout

const LayoutWrapper: FC = ({ children }) => (
  <Wrapper>
    <Header>
      <Logo />
      <UserMenu />
    </Header>
    <AntdContent>{children}</AntdContent>
    <Footer>
      <Copyright />
    </Footer>
  </Wrapper>
)

export default LayoutWrapper
