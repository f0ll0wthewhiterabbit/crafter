import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'

import { UNIT_FORM_MODAL_MODES, UNIT_TYPES } from '@/constants/unit.constants'
import { RootState } from '@/store/rootReducer'
import Board from '@/components/pages/Home/components/Board'
import Unit from '@/components/pages/Home/components/Unit'
import AddButton from '@/components/pages/Home/components/AddButton'
import { DRAG_UNIT_TYPES } from '@/constants/dragAndDrop.constants'
import { DropTargetMonitorWithPayload } from '@/types/dragAndDrop.types'
import { extractRecipeFromBagRequest } from '@/store/recipesSlice'

const Recipes: FC = () => {
  const { data: recipes } = useSelector((state: RootState) => state.recipes)
  const { loadingState: recipesLoadingState } = useSelector((state: RootState) => state.recipes)
  const dispatch = useDispatch()

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DRAG_UNIT_TYPES.BAGGED_RECIPE,
    drop: (monitor: DropTargetMonitorWithPayload) => {
      dispatch(extractRecipeFromBagRequest(monitor.id))
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <Board
      dropRef={drop}
      isDropOver={isOver}
      title="Recipes"
      isLoaderVisible={recipesLoadingState === 'loading'}
      controls={<AddButton mode={UNIT_FORM_MODAL_MODES.RECIPE_ADD} title="Add recipe" />}
    >
      {recipes
        .filter((recipe) => !recipe.belongsTo)
        .map((recipe) => (
          <Unit
            unit={recipe}
            unitType={UNIT_TYPES.RECIPE}
            dragUnitType={DRAG_UNIT_TYPES.RECIPE}
            key={recipe.id}
          />
        ))}
    </Board>
  )
}

export default Recipes
