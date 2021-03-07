import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import Loader from '@/components/Loader'
import { RootState } from '@/store/rootReducer'

import Copyright from './components/Copyright'
import Logo from './components/Logo'
import UserMenu from './components/UserMenu'
import { Wrapper, Header, Content, Footer } from './styles'

const Layout: FC = ({ children }) => {
  const { itemsLoadingState } = useSelector((state: RootState) => state.game)
  const { recipesLoadingState } = useSelector((state: RootState) => state.game)

  return (
    <Wrapper>
      <Header>
        <Logo />
        <UserMenu />
      </Header>
      <Content>
        <Loader
          isVisible={
            itemsLoadingState === 'fetching' ||
            itemsLoadingState === 'bagLoading' ||
            recipesLoadingState === 'fetching' ||
            recipesLoadingState === 'bagLoading'
          }
          text="Loading..."
        />
        {children}
      </Content>
      <Footer>
        <Copyright />
      </Footer>
    </Wrapper>
  )
}

export default Layout
