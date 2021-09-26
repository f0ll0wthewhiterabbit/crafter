import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'
import { io } from 'socket.io-client'

import { UNIT_FORM_MODAL_MODES, UNIT_TYPES } from '@/constants/unit.constants'
import { RootState } from '@/store/rootReducer'
import Board from '@/components/pages/Home/components/Board'
import Unit from '@/components/pages/Home/components/Unit'
import AddButton from '@/components/pages/Home/components/AddButton'
import { DRAG_UNIT_TYPES } from '@/constants/dragAndDrop.constants'
import { DropTargetMonitorWithPayload } from '@/types/dragAndDrop.types'
import {
  addRecipeSuccess,
  deleteRecipeSuccess,
  editRecipeSuccess,
  extractRecipeFromBagRequest,
} from '@/store/recipesSlice'
import { Recipe } from '@/types/recipe.types'
import { BASE_WEB_SOCKET_URL } from '@/constants/endpoints.constants'

const Recipes: FC = () => {
  const { data: recipes } = useSelector((state: RootState) => state.recipes)
  const { loadingState: recipesLoadingState } = useSelector((state: RootState) => state.recipes)
  const { user } = useSelector((state: RootState) => state.auth)
  const userId = user?._id
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userId) {
      return
    }

    const socket = io(`${BASE_WEB_SOCKET_URL}/recipes`)
    socket.on('recipeAppear', (recipe: Recipe) => {
      dispatch(addRecipeSuccess(recipe))
    })
    socket.on('recipesRemove', (recipeIds: string[]) => {
      recipeIds.forEach((recipeId) => {
        dispatch(deleteRecipeSuccess({ recipeId, isItemCrafted: false }))
      })
    })
    socket.on('recipeUpdate', (recipe: Recipe) => {
      dispatch(editRecipeSuccess(recipe))
    })
    socket.on('recipeBag', (recipe: Recipe) => {
      if (recipe.belongsTo !== userId) {
        dispatch(deleteRecipeSuccess({ recipeId: recipe._id, isItemCrafted: false }))
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [dispatch, userId])

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
            key={recipe._id}
          />
        ))}
    </Board>
  )
}

export default Recipes
