import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { UNIT_FORM_MODAL_MODES, UNIT_TYPES } from '@/constants/unit.constants'
import { RootState } from '@/store/rootReducer'
import Board from '@/pages/Home/components/Board'
import Unit from '@/pages/Home/components/Unit'
import AddButton from '@/pages/Home/components/AddButton'

const Recipes: FC = () => {
  const { recipes } = useSelector((state: RootState) => state.game)

  return (
    <Board
      title="Recipes"
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
