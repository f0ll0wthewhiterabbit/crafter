import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchItemsRequest, fetchRecipesRequest } from '@/store/gameSlice'

import Items from './components/Items'
import Bag from './components/Bag'
import Recipes from './components/Recipes'
import { Wrapper } from './styles'

const HomePage: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchItemsRequest())
    dispatch(fetchRecipesRequest())
  }, [dispatch])

  return (
    <Wrapper>
      <Items />
      <Bag />
      <Recipes />
    </Wrapper>
  )
}

export default HomePage
