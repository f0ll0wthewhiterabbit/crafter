import React, { FC, useEffect } from 'react'
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { fetchItemsRequest, fetchRecipesRequest } from '@/store/gameSlice'
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
    <Wrapper>
      <Items />
      <Bag />
      <Recipes />
    </Wrapper>
  )
}

export default HomePage
