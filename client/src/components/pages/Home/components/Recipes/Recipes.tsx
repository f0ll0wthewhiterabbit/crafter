import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { UNIT_FORM_MODAL_MODES, UNIT_TYPES } from '@/constants/unit.constants'
import { RootState } from '@/store/rootReducer'
import Board from '@/components/pages/Home/components/Board'
import Unit from '@/components/pages/Home/components/Unit'
import AddButton from '@/components/pages/Home/components/AddButton'

const Recipes: FC = () => {
  const { data: recipes } = useSelector((state: RootState) => state.recipes)
  const { loadingState: recipesLoadingState } = useSelector((state: RootState) => state.recipes)

  return (
    <Board
      title="Recipes"
      isLoaderVisible={recipesLoadingState === 'loading'}
      controls={<AddButton mode={UNIT_FORM_MODAL_MODES.RECIPE_ADD} title="Add recipe" />}
    >
      {recipes
        .filter((recipe) => !recipe.belongsTo)
        .map((recipe) => (
          <Unit unit={recipe} unitType={UNIT_TYPES.RECIPE} key={recipe._id} />
        ))}
    </Board>
  )
}

export default Recipes
