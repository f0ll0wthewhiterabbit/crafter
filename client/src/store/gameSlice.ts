import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { Item, ItemForm } from '@/types/item.types'
import { Recipe, RecipeForm } from '@/types/recipe.types'
import { AppThunk } from '@/store/store'
import { itemsService } from '@/services/items.api'
import { recipesService } from '@/services/recipes.api'
import { signOutRequest } from '@/store/authSlice'

type GameLoadingState =
  | 'fetching'
  | 'loading'
  | 'modalLoading'
  | 'bagLoading'
  | 'loaded'
  | 'crafted'
  | 'error'
  | null

interface GameState {
  items: Item[]
  itemsLoadingState: GameLoadingState
  itemsError: string | null
  recipes: Recipe[]
  recipesLoadingState: GameLoadingState
  recipesError: string | null
}

interface FetchItemsPayload {
  items: Item[]
  isItemCrafted: boolean
}

interface DeleteRecipePayload {
  recipeId: Recipe['_id']
  isItemCrafted: boolean
}

interface MoveItemToBagPayload {
  itemId: Item['_id']
  baggageDate: Item['baggageDate']
  belongsTo: Item['belongsTo']
}

interface MoveRecipeToBagPayload {
  recipeId: Recipe['_id']
  baggageDate: Recipe['baggageDate']
  belongsTo: Recipe['belongsTo']
}

const initialState: GameState = {
  items: [],
  itemsLoadingState: null,
  itemsError: null,
  recipes: [],
  recipesLoadingState: null,
  recipesError: null,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startItemsLoading(state, { payload: loadingState }: PayloadAction<GameLoadingState>) {
      state.itemsLoadingState = loadingState
    },
    fetchItemsSuccess(state, { payload }: PayloadAction<FetchItemsPayload>) {
      const { items, isItemCrafted } = payload

      state.items = items
      state.itemsLoadingState = isItemCrafted ? 'crafted' : 'loaded'
      state.itemsError = null
    },
    addItemSuccess(state, { payload: item }: PayloadAction<Item>) {
      state.items.push(item)
      state.itemsLoadingState = 'loaded'
      state.itemsError = null
    },
    editItemSuccess(state, { payload: item }: PayloadAction<Item>) {
      const itemIndex = state.items.findIndex((stateItem) => stateItem._id === item._id)

      if (itemIndex > -1) {
        state.items[itemIndex] = item
      }

      state.itemsLoadingState = 'loaded'
      state.itemsError = null
    },
    deleteItemSuccess(state, { payload: itemId }: PayloadAction<Item['_id']>) {
      const itemIndex = state.items.findIndex((stateItem) => stateItem._id === itemId)

      if (itemIndex > -1) {
        state.items.splice(itemIndex, 1)
      }

      state.itemsLoadingState = 'loaded'
      state.itemsError = null
    },
    moveItemToBagSuccess(state, { payload }: PayloadAction<MoveItemToBagPayload>) {
      const { itemId, baggageDate, belongsTo } = payload
      const itemIndex = state.items.findIndex((stateItem) => stateItem._id === itemId)

      if (itemIndex > -1) {
        state.items[itemIndex].belongsTo = belongsTo
        state.items[itemIndex].baggageDate = baggageDate
      }

      state.itemsLoadingState = 'loaded'
      state.itemsError = null
    },
    extractItemFromBagSuccess(state, { payload: itemId }: PayloadAction<Item['_id']>) {
      const itemIndex = state.items.findIndex((stateItem) => stateItem._id === itemId)

      if (itemIndex > -1) {
        state.items[itemIndex].belongsTo = null
        state.items[itemIndex].baggageDate = null
        state.items.push(state.items.splice(itemIndex, 1)[0])
      }

      state.itemsLoadingState = 'loaded'
      state.itemsError = null
    },
    setItemsError(state: GameState, { payload: itemsError }: PayloadAction<string>) {
      state.itemsError = itemsError
      state.itemsLoadingState = 'error'
    },
    resetItemsError(state) {
      state.itemsLoadingState = null
      state.itemsError = null
    },
    startRecipesLoading(state, { payload: loadingState }: PayloadAction<GameLoadingState>) {
      state.recipesLoadingState = loadingState
    },
    fetchRecipesSuccess(state, { payload: recipes }: PayloadAction<Recipe[]>) {
      state.recipes = recipes
      state.recipesLoadingState = 'loaded'
      state.recipesError = null
    },
    addRecipeSuccess(state, { payload: recipe }: PayloadAction<Recipe>) {
      state.recipes.push(recipe)
      state.recipesLoadingState = 'loaded'
      state.recipesError = null
    },
    editRecipeSuccess(state, { payload: recipe }: PayloadAction<Recipe>) {
      const recipeIndex = state.recipes.findIndex((stateItem) => stateItem._id === recipe._id)

      if (recipeIndex > -1) {
        state.recipes[recipeIndex] = recipe
      }

      state.recipesLoadingState = 'loaded'
      state.recipesError = null
    },
    deleteRecipeSuccess(state, { payload }: PayloadAction<DeleteRecipePayload>) {
      const { recipeId, isItemCrafted } = payload
      const recipeIndex = state.recipes.findIndex((stateRecipe) => stateRecipe._id === recipeId)

      if (recipeIndex > -1) {
        state.recipes.splice(recipeIndex, 1)
      }

      state.recipesLoadingState = isItemCrafted ? 'crafted' : 'loaded'
      state.recipesError = null
    },
    moveRecipeToBagSuccess(state, { payload }: PayloadAction<MoveRecipeToBagPayload>) {
      const { recipeId, baggageDate, belongsTo } = payload
      const recipeIndex = state.recipes.findIndex((stateRecipe) => stateRecipe._id === recipeId)

      if (recipeIndex > -1) {
        state.recipes[recipeIndex].belongsTo = belongsTo
        state.recipes[recipeIndex].baggageDate = baggageDate
      }

      state.recipesLoadingState = 'loaded'
      state.recipesError = null
    },
    extractRecipeFromBagSuccess(state, { payload: recipeId }: PayloadAction<Recipe['_id']>) {
      const recipeIndex = state.recipes.findIndex((stateRecipe) => stateRecipe._id === recipeId)

      if (recipeIndex > -1) {
        state.recipes[recipeIndex].belongsTo = null
        state.recipes[recipeIndex].baggageDate = null
        state.recipes.push(state.recipes.splice(recipeIndex, 1)[0])
      }

      state.recipesLoadingState = 'loaded'
      state.recipesError = null
    },
    setRecipesError(state: GameState, { payload: recipesError }: PayloadAction<string>) {
      state.recipesError = recipesError
      state.recipesLoadingState = 'error'
    },
    resetRecipesError(state) {
      state.recipesLoadingState = null
      state.recipesError = null
    },
  },
})

export const {
  startItemsLoading,
  fetchItemsSuccess,
  addItemSuccess,
  editItemSuccess,
  deleteItemSuccess,
  moveItemToBagSuccess,
  extractItemFromBagSuccess,
  setItemsError,
  resetItemsError,
  startRecipesLoading,
  fetchRecipesSuccess,
  addRecipeSuccess,
  editRecipeSuccess,
  deleteRecipeSuccess,
  moveRecipeToBagSuccess,
  extractRecipeFromBagSuccess,
  setRecipesError,
  resetRecipesError,
} = gameSlice.actions

// Items request actions
export const fetchItemsRequest = (isItemCrafted = false): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading('fetching'))
    const items = await itemsService.getItems()
    dispatch(fetchItemsSuccess({ items, isItemCrafted }))
  } catch (error) {
    dispatch(handleItemsErrorRequest(error, 'Items data not received'))
  }
}

export const addItemRequest = (
  itemFormValues: ItemForm,
  successCallback: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading('modalLoading'))
    const item = await itemsService.addItem(itemFormValues)
    dispatch(addItemSuccess(item))
    successCallback()
  } catch (error) {
    dispatch(handleItemsErrorRequest(error, "Couldn't create item"))
  }
}

export const editItemRequest = (
  itemId: Item['_id'],
  itemFormValues: ItemForm,
  successCallback: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading('modalLoading'))
    const item = await itemsService.editItem(itemId, itemFormValues)
    dispatch(editItemSuccess(item))
    successCallback()
  } catch (error) {
    dispatch(handleItemsErrorRequest(error, "Couldn't update item"))
  }
}

export const deleteItemRequest = (
  itemId: Item['_id'],
  successCallback: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading('modalLoading'))
    await itemsService.deleteItem(itemId)
    dispatch(deleteItemSuccess(itemId))
    successCallback()
  } catch (error) {
    dispatch(handleItemsErrorRequest(error, "Couldn't delete item"))
  }
}

export const moveItemToBagRequest = (itemId: Item['_id']): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading('bagLoading'))
    const { baggageDate, belongsTo, _id, parentRecipe } = await itemsService.bag(itemId)

    if (_id !== itemId && parentRecipe) {
      dispatch(deleteRecipeSuccess({ recipeId: parentRecipe, isItemCrafted: true }))
      dispatch(fetchItemsRequest(true))
    } else {
      dispatch(moveItemToBagSuccess({ itemId, baggageDate, belongsTo }))
    }
  } catch (error) {
    dispatch(handleItemsErrorRequest(error, "Couldn't move item to bag"))
  }
}

export const extractItemFromBagRequest = (itemId: Item['_id']): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading('bagLoading'))
    await itemsService.unbag(itemId)
    dispatch(extractItemFromBagSuccess(itemId))
  } catch (error) {
    dispatch(handleItemsErrorRequest(error, "Couldn't extract item from bag"))
  }
}

export const handleItemsErrorRequest = (error: AxiosError, errorMessage: string): AppThunk => (
  dispatch
) => {
  if (error.response?.data.statusCode === 401) {
    dispatch(setItemsError('Token expired'))
    dispatch(signOutRequest())
  } else {
    dispatch(setItemsError(errorMessage))
  }
}

// Recipes request actions
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

export default gameSlice.reducer
