import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from 'antd'
import { IconType } from 'antd/lib/notification'

import Loader from '@/components/Loader'
import { RootState } from '@/store/rootReducer'
import { resetItemsError, resetRecipesError } from '@/store/gameSlice'

import Copyright from './components/Copyright'
import Logo from './components/Logo'
import UserMenu from './components/UserMenu'
import { Wrapper, Header, Content, Footer } from './styles'

const Layout: FC = ({ children }) => {
  const { itemsLoadingState } = useSelector((state: RootState) => state.game)
  const { recipesLoadingState } = useSelector((state: RootState) => state.game)
  const { itemsError } = useSelector((state: RootState) => state.game)
  const { recipesError } = useSelector((state: RootState) => state.game)
  const dispatch = useDispatch()

  useEffect(() => {
    if (itemsError) {
      showNotification('error', 'Error', itemsError)
      dispatch(resetItemsError())
    }
  }, [itemsError, dispatch])

  useEffect(() => {
    if (recipesError) {
      showNotification('error', 'Error', recipesError)
      dispatch(resetRecipesError())
    }
  }, [recipesError, dispatch])

  const showNotification = (type: IconType, message: string, description: string) => {
    notification[type]({ message, description, placement: 'bottomRight' })
  }

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
