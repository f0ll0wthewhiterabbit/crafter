import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { UNIT_TYPES } from '@/constants/unit.constants'
import { RootState } from '@/store/rootReducer'
import { DUMMY_USER_ID } from '@/constants/user.constants'
import Board from '@/pages/Home/components/Board'
import Unit from '@/pages/Home/components/Unit'
import { TypedUnit } from '@/types/unit.types'

const Bag: FC = () => {
  const { items } = useSelector((state: RootState) => state.game)
  const { recipes } = useSelector((state: RootState) => state.game)

  const bagUnits = [
    ...items
      .filter((item) => item.belongsTo === DUMMY_USER_ID)
      .map((item) => ({ ...item, type: UNIT_TYPES.ITEM })),
    ...recipes
      .filter((recipe) => recipe.belongsTo === DUMMY_USER_ID)
      .map((recipe) => ({ ...recipe, type: UNIT_TYPES.RECIPE })),
  ] as TypedUnit[]

  const sortedBagUnits = bagUnits.sort((a, b) => {
    if (a.baggageDate && b.baggageDate) {
      if (a.baggageDate > b.baggageDate) {
        return 1
      }

      if (a.baggageDate < b.baggageDate) {
        return -1
      }
    }

    return 0
  })

  return (
    <Board title="Bag" isLoaderVisible={false}>
      {sortedBagUnits.map((unit) => (
        <Unit unit={unit} unitType={unit.type} key={unit._id} />
      ))}
    </Board>
  )
}

export default Bag
