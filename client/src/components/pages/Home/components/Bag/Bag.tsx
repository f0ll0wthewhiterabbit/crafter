import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { UNIT_TYPES } from '@/constants/unit.constants'
import { RootState } from '@/store/rootReducer'
import Board from '@/components/pages/Home/components/Board'
import Unit from '@/components/pages/Home/components/Unit'
import { TypedUnit } from '@/types/unit.types'

const Bag: FC = () => {
  const { data: items } = useSelector((state: RootState) => state.items)
  const { data: recipes } = useSelector((state: RootState) => state.recipes)
  const { loadingState: itemsLoadingState } = useSelector((state: RootState) => state.items)
  const { user } = useSelector((state: RootState) => state.auth)
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    if (itemsLoadingState === 'crafted') {
      setIsAnimated(true)
      setTimeout(() => {
        setIsAnimated(false)
      }, 5000)
    }
  }, [itemsLoadingState])

  const bagUnits = [
    ...items
      .filter((item) => item.belongsTo === user?._id)
      .map((item) => ({ ...item, type: UNIT_TYPES.ITEM })),
    ...recipes
      .filter((recipe) => recipe.belongsTo === user?._id)
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
    <Board title="Bag" isLoaderVisible={false} isAnimated={isAnimated}>
      {sortedBagUnits.map((unit) => (
        <Unit unit={unit} unitType={unit.type} key={unit._id} />
      ))}
    </Board>
  )
}

export default Bag