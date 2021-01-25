import React, { FC } from 'react'

import { Item } from '@/interfaces/Item'
import { Recipe } from '@/interfaces/Recipe'
import { UNIT_MODAL_MODES } from '@/constants/unitModalModes'

import Board from './components/Board'
import AddButton from './components/AddButton'
import Unit from './components/Unit'
import { Wrapper } from './styles'

const HomePage: FC = () => {
  const item = {
    id: '1a2s3d',
    title: 'Cat',
    imageSrc: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  } as Item
  const recipe = {
    id: '1a2s3d123',
    title: 'React',
    imageSrc: 'https://www.andreasreiterer.at/wp-content/uploads/2017/11/react-logo-825x510.jpg',
    items: ['Item-1', 'Item-2', 'Item-3'],
  } as Recipe

  return (
    <Wrapper>
      <Board
        title="Items"
        controls={<AddButton mode={UNIT_MODAL_MODES.ITEM_ADD} title="Add item" />}
      >
        <Unit item={item} />
      </Board>
      <Board title="Bag"></Board>
      <Board
        title="Recipes"
        controls={<AddButton mode={UNIT_MODAL_MODES.RECIPE_ADD} title="Add recipe" />}
      >
        <Unit recipe={recipe} />
      </Board>
    </Wrapper>
  )
}

export default HomePage
