import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { Recipe, RecipeForm } from '@/types/recipe.types'
import { AppThunk } from '@/store/store'
import { recipesService } from '@/services/recipes.api'
import { signOutRequest } from '@/store/authSlice'
import { fetchItemsRequest } from '@/store/itemsSlice'

type RecipesLoadingState =
  | 'fetching'
  | 'loading'
  | 'modalLoading'
  | 'bagLoading'
  | 'loaded'
  | 'crafted'
  | 'error'
  | null

interface RecipesState {
  data: Recipe[]
  loadingState: RecipesLoadingState
  error: string | null
}

interface DeleteRecipePayload {
  recipeId: Recipe['_id']
  isItemCrafted: boolean
}

interface MoveRecipeToBagPayload {
  recipeId: Recipe['_id']
  baggageDate: Recipe['baggageDate']
  belongsTo: Recipe['belongsTo']
}

const initialState: RecipesState = {
  data: [],
  loadingState: null,
  error: null,
}

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    startRecipesLoading(state, { payload: loadingState }: PayloadAction<RecipesLoadingState>) {
      state.loadingState = loadingState
    },
    fetchRecipesSuccess(state, { payload: recipes }: PayloadAction<Recipe[]>) {
      state.data = recipes
      state.loadingState = 'loaded'
      state.error = null
    },
    addRecipeSuccess(state, { payload: recipe }: PayloadAction<Recipe>) {
      const isRecipeExist = state.data.some(({ _id }) => _id === recipe._id)

      if (!isRecipeExist) {
        state.data.push(recipe)
      }

      state.loadingState = 'loaded'
      state.error = null
    },
    editRecipeSuccess(state, { payload: recipe }: PayloadAction<Recipe>) {
      const recipeIndex = state.data.findIndex((stateItem) => stateItem._id === recipe._id)

      if (recipeIndex > -1) {
        state.data[recipeIndex] = recipe
      }

      state.loadingState = 'loaded'
      state.error = null
    },
    deleteRecipeSuccess(state, { payload }: PayloadAction<DeleteRecipePayload>) {
      const { recipeId, isItemCrafted } = payload
      const recipeIndex = state.data.findIndex((stateRecipe) => stateRecipe._id === recipeId)

      if (recipeIndex > -1) {
        state.data.splice(recipeIndex, 1)
      }

      state.loadingState = isItemCrafted ? 'crafted' : 'loaded'
      state.error = null
    },
    moveRecipeToBagSuccess(state, { payload }: PayloadAction<MoveRecipeToBagPayload>) {
      const { recipeId, baggageDate, belongsTo } = payload
      const recipeIndex = state.data.findIndex((stateRecipe) => stateRecipe._id === recipeId)

      if (recipeIndex > -1) {
        state.data[recipeIndex].belongsTo = belongsTo
        state.data[recipeIndex].baggageDate = baggageDate
      }

      state.loadingState = 'loaded'
      state.error = null
    },
    extractRecipeFromBagSuccess(state, { payload: recipeId }: PayloadAction<Recipe['_id']>) {
      const recipeIndex = state.data.findIndex((stateRecipe) => stateRecipe._id === recipeId)

      if (recipeIndex > -1) {
        state.data[recipeIndex].belongsTo = null
        state.data[recipeIndex].baggageDate = null
        state.data.push(state.data.splice(recipeIndex, 1)[0])
      }

      state.loadingState = 'loaded'
      state.error = null
    },
    setRecipesError(state: RecipesState, { payload: recipesError }: PayloadAction<string>) {
      state.error = recipesError
      state.loadingState = 'error'
    },
    resetRecipesError(state) {
      state.loadingState = null
      state.error = null
    },
  },
})

export const {
  startRecipesLoading,
  fetchRecipesSuccess,
  addRecipeSuccess,
  editRecipeSuccess,
  deleteRecipeSuccess,
  moveRecipeToBagSuccess,
  extractRecipeFromBagSuccess,
  setRecipesError,
  resetRecipesError,
} = recipesSlice.actions

export const fetchRecipesRequest = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startRecipesLoading('fetching'))
    const recipes = await recipesService.getRecipes()
    dispatch(fetchRecipesSuccess(recipes))
  } catch (error) {
    dispatch(handleRecipesErrorRequest(error, 'Recipes data not received'))
  }
}

export const addRecipeRequest = (
  recipeFormValues: RecipeForm,
  successCallback: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(startRecipesLoading('modalLoading'))
    const recipe = await recipesService.addRecipe(recipeFormValues)
    dispatch(addRecipeSuccess(recipe))
    successCallback()
  } catch (error) {
    dispatch(handleRecipesErrorRequest(error, "Couldn't create recipe"))
  }
}

export const editRecipeRequest = (
  recipeId: Recipe['_id'],
  recipeFormValues: RecipeForm,
  successCallback: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(startRecipesLoading('modalLoading'))
    const recipe = await recipesService.editRecipe(recipeId, recipeFormValues)
    dispatch(editRecipeSuccess(recipe))
    successCallback()
  } catch (error) {
    dispatch(handleRecipesErrorRequest(error, "Couldn't update recipe"))
  }
}

export const deleteRecipeRequest = (
  recipeId: Recipe['_id'],
  successCallback: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(startRecipesLoading('modalLoading'))
    await recipesService.deleteRecipe(recipeId)
    dispatch(deleteRecipeSuccess({ recipeId, isItemCrafted: false }))
    successCallback()
  } catch (error) {
    dispatch(handleRecipesErrorRequest(error, "Couldn't delete recipe"))
  }
}

export const moveRecipeToBagRequest = (recipeId: Recipe['_id']): AppThunk => async (dispatch) => {
  try {
    dispatch(startRecipesLoading('bagLoading'))
    const { baggageDate, belongsTo, isParent } = await recipesService.bag(recipeId)

    if (isParent) {
      dispatch(deleteRecipeSuccess({ recipeId, isItemCrafted: true }))
      dispatch(fetchItemsRequest(true))
    } else {
      dispatch(moveRecipeToBagSuccess({ recipeId, baggageDate, belongsTo }))
    }
  } catch (error) {
    dispatch(handleRecipesErrorRequest(error, "Couldn't move recipe to bag"))
  }
}

export const extractRecipeFromBagRequest = (recipeId: Recipe['_id']): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(startRecipesLoading('bagLoading'))
    await recipesService.unbag(recipeId)
    dispatch(extractRecipeFromBagSuccess(recipeId))
  } catch (error) {
    dispatch(handleRecipesErrorRequest(error, "Couldn't extract recipe from bag"))
  }
}

export const handleRecipesErrorRequest = (error: AxiosError, errorMessage: string): AppThunk => (
  dispatch
) => {
  if (error.response?.data.statusCode === 401) {
    dispatch(setRecipesError('Token expired'))
    dispatch(signOutRequest())
  } else {
    dispatch(setRecipesError(errorMessage))
  }
}

export default recipesSlice.reducer
