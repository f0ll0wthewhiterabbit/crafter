import React, { FC, useEffect } from 'react'
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { fetchItemsRequest } from '@/store/itemsSlice'
import { fetchRecipesRequest } from '@/store/recipesSlice'
import { RootState } from '@/store/rootReducer'
import { ROUTE_NAMES } from '@/router/routes.constants'

import Items from './components/Items'
import Bag from './components/Bag'
import Recipes from './components/Recipes'
import { Wrapper } from './styles'

const HomePage: FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { isInitialized } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchItemsRequest())
      dispatch(fetchRecipesRequest())
    }
  }, [dispatch, isAuthenticated])

  if (!isAuthenticated && isInitialized) {
    return <Redirect to={ROUTE_NAMES.SIGN_IN} />
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <Items />
        <Bag />
        <Recipes />
      </Wrapper>
    </DndProvider>
  )
}

export default HomePage
