import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'

import { UNIT_TYPES } from '@/constants/unit.constants'
import { RootState } from '@/store/rootReducer'
import Board from '@/components/pages/Home/components/Board'
import Unit from '@/components/pages/Home/components/Unit'
import { TypedUnit } from '@/types/unit.types'
import { DRAG_UNIT_TYPES } from '@/constants/dragAndDrop.constants'
import { DropTargetMonitorWithPayload } from '@/types/dragAndDrop.types'
import { moveItemToBagRequest } from '@/store/itemsSlice'
import { moveRecipeToBagRequest } from '@/store/recipesSlice'

const Bag: FC = () => {
  const { data: items } = useSelector((state: RootState) => state.items)
  const { data: recipes } = useSelector((state: RootState) => state.recipes)
  const { loadingState: itemsLoadingState } = useSelector((state: RootState) => state.items)
  const { user } = useSelector((state: RootState) => state.auth)
  const [isAnimated, setIsAnimated] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (itemsLoadingState === 'crafted') {
      setIsAnimated(true)
      setTimeout(() => {
        setIsAnimated(false)
      }, 5000)
    }
  }, [itemsLoadingState])

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [DRAG_UNIT_TYPES.ITEM, DRAG_UNIT_TYPES.RECIPE],
    drop: (monitor: DropTargetMonitorWithPayload) => {
      const { id, dragUnitType } = monitor

      if (dragUnitType === DRAG_UNIT_TYPES.ITEM) {
        dispatch(moveItemToBagRequest(id))
      } else if (dragUnitType === DRAG_UNIT_TYPES.RECIPE) {
        dispatch(moveRecipeToBagRequest(id))
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const bagUnits = [
    ...items
      .filter((item) => item.belongsTo === user?.id)
      .map((item) => ({ ...item, type: UNIT_TYPES.ITEM })),
    ...recipes
      .filter((recipe) => recipe.belongsTo === user?.id)
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
    <Board
      dropRef={drop}
      isDropOver={isOver}
      title="Bag"
      isLoaderVisible={false}
      isAnimated={isAnimated}
    >
      {sortedBagUnits.map((unit) => (
        <Unit
          unit={unit}
          unitType={unit.type}
          dragUnitType={
            unit.type === UNIT_TYPES.RECIPE
              ? DRAG_UNIT_TYPES.BAGGED_RECIPE
              : DRAG_UNIT_TYPES.BAGGED_ITEM
          }
          key={unit.id}
        />
      ))}
    </Board>
  )
}

export default Bag
