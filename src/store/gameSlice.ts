import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Item } from '@/types/item.types'
import { Recipe } from '@/types/recipe.types'
import { AppThunk } from '@/store/store'
import { getDataFromStorage } from '@/helpers/storage.helper'
import { STORAGE_KEYS } from '@/constants/storage.constants'
import { DUMMY_USER_ID } from '@/constants/user.constants'

interface GameState {
  items: Item[]
  isItemsLoading: boolean
  itemsError: string | null
  recipes: Recipe[]
  isRecipesLoading: boolean
  recipesError: string | null
}

interface MoveItemToBagPayload {
  itemId: Item['id']
  baggageDate: Item['baggageDate']
}

interface MoveRecipeToBagPayload {
  recipeId: Recipe['id']
  baggageDate: Recipe['baggageDate']
}

const initialState: GameState = {
  items: [],
  isItemsLoading: false,
  itemsError: null,
  recipes: [],
  isRecipesLoading: false,
  recipesError: null,
}

const itemsLoadingFailed = (state: GameState, { payload: itemsError }: PayloadAction<string>) => {
  state.itemsError = itemsError
  state.isItemsLoading = false
}

const recipesLoadingFailed = (
  state: GameState,
  { payload: recipesError }: PayloadAction<string>
) => {
  state.recipesError = recipesError
  state.isRecipesLoading = false
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startItemsLoading(state) {
      state.isItemsLoading = true
    },
    fetchItemsSuccess(state, { payload: items }: PayloadAction<Item[]>) {
      state.items = items
      state.isItemsLoading = false
      state.itemsError = null
    },
    addItemSuccess(state, { payload: item }: PayloadAction<Item>) {
      state.items.push(item)
      state.isItemsLoading = false
      state.itemsError = null
    },
    editItemSuccess(state, { payload: item }: PayloadAction<Item>) {
      const itemIndex = state.items.findIndex((stateItem) => stateItem.id === item.id)

      if (itemIndex > -1) {
        state.items[itemIndex] = item
      }

      state.isItemsLoading = false
      state.itemsError = null
    },
    deleteItemSuccess(state, { payload: itemId }: PayloadAction<Item['id']>) {
      const itemIndex = state.items.findIndex((stateItem) => stateItem.id === itemId)

      if (itemIndex > -1) {
        state.items.splice(itemIndex, 1)
      }

      state.isItemsLoading = false
      state.itemsError = null
    },
    moveItemToBagSuccess(state, { payload }: PayloadAction<MoveItemToBagPayload>) {
      const { itemId, baggageDate } = payload
      const itemIndex = state.items.findIndex((stateItem) => stateItem.id === itemId)

      if (itemIndex > -1) {
        state.items[itemIndex].belongsTo = DUMMY_USER_ID
        state.items[itemIndex].baggageDate = baggageDate
      }

      state.isItemsLoading = false
      state.itemsError = null
    },
    extractItemFromBagSuccess(state, { payload: itemId }: PayloadAction<Item['id']>) {
      const itemIndex = state.items.findIndex((stateItem) => stateItem.id === itemId)

      if (itemIndex > -1) {
        state.items[itemIndex].belongsTo = null
        state.items[itemIndex].baggageDate = null
        state.items.push(state.items.splice(itemIndex, 1)[0])
      }

      state.isItemsLoading = false
      state.itemsError = null
    },
    fetchItemsError: itemsLoadingFailed,
    addItemError: itemsLoadingFailed,
    editItemError: itemsLoadingFailed,
    deleteItemError: itemsLoadingFailed,
    moveItemToBagError: itemsLoadingFailed,
    extractItemFromBagError: itemsLoadingFailed,
    startRecipesLoading(state) {
      state.isRecipesLoading = true
    },
    fetchRecipesSuccess(state, { payload: recipes }: PayloadAction<Recipe[]>) {
      state.recipes = recipes
      state.isRecipesLoading = false
      state.recipesError = null
    },
    addRecipeSuccess(state, { payload: recipe }: PayloadAction<Recipe>) {
      state.recipes.push(recipe)
      state.isRecipesLoading = false
      state.recipesError = null
    },
    editRecipeSuccess(state, { payload: recipe }: PayloadAction<Recipe>) {
      const recipeIndex = state.recipes.findIndex((stateItem) => stateItem.id === recipe.id)

      if (recipeIndex > -1) {
        state.recipes[recipeIndex] = recipe
      }

      state.isRecipesLoading = false
      state.recipesError = null
    },
    deleteRecipeSuccess(state, { payload: recipeId }: PayloadAction<Recipe['id']>) {
      const recipeIndex = state.recipes.findIndex((stateRecipe) => stateRecipe.id === recipeId)

      if (recipeIndex > -1) {
        state.recipes.splice(recipeIndex, 1)
      }

      state.isRecipesLoading = false
      state.recipesError = null
    },
    moveRecipeToBagSuccess(state, { payload }: PayloadAction<MoveRecipeToBagPayload>) {
      const { recipeId, baggageDate } = payload
      const recipeIndex = state.recipes.findIndex((stateRecipe) => stateRecipe.id === recipeId)

      if (recipeIndex > -1) {
        state.recipes[recipeIndex].belongsTo = DUMMY_USER_ID
        state.recipes[recipeIndex].baggageDate = baggageDate
      }

      state.isRecipesLoading = false
      state.recipesError = null
    },
    extractRecipeFromBagSuccess(state, { payload: recipeId }: PayloadAction<Recipe['id']>) {
      const recipeIndex = state.recipes.findIndex((stateRecipe) => stateRecipe.id === recipeId)

      if (recipeIndex > -1) {
        state.recipes[recipeIndex].belongsTo = null
        state.recipes[recipeIndex].baggageDate = null
        state.recipes.push(state.recipes.splice(recipeIndex, 1)[0])
      }

      state.isRecipesLoading = false
      state.recipesError = null
    },
    fetchRecipesError: recipesLoadingFailed,
    addRecipeError: recipesLoadingFailed,
    editRecipeError: recipesLoadingFailed,
    deleteRecipeError: recipesLoadingFailed,
    moveRecipeToBagError: recipesLoadingFailed,
    extractRecipeFromBagError: recipesLoadingFailed,
  },
})

export const {
  startItemsLoading,
  fetchItemsSuccess,
  fetchItemsError,
  addItemSuccess,
  addItemError,
  editItemSuccess,
  editItemError,
  deleteItemSuccess,
  deleteItemError,
  moveItemToBagSuccess,
  moveItemToBagError,
  extractItemFromBagSuccess,
  extractItemFromBagError,
  startRecipesLoading,
  fetchRecipesSuccess,
  fetchRecipesError,
  addRecipeSuccess,
  addRecipeError,
  editRecipeSuccess,
  editRecipeError,
  deleteRecipeSuccess,
  deleteRecipeError,
  moveRecipeToBagSuccess,
  moveRecipeToBagError,
  extractRecipeFromBagSuccess,
  extractRecipeFromBagError,
} = gameSlice.actions

export const fetchItemsRequest = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading())

    const items = getDataFromStorage(STORAGE_KEYS.ITEMS) as Item[]

    if (!items) {
      throw new Error('Items data not received')
    }

    dispatch(fetchItemsSuccess(items))
  } catch (error) {
    dispatch(fetchItemsError(error.message))
  }
}

export const addItemRequest = (item: Item): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(startItemsLoading())

    const state = getState()
    const items = [...state.game.items, item]

    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items))
    dispatch(addItemSuccess(item))
  } catch {
    dispatch(addItemError('Item add error'))
  }
}

export const editItemRequest = (item: Item): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(startItemsLoading())

    const state = getState()
    const items = state.game.items.map((stateItem) => {
      if (stateItem.id === item.id) {
        return item
      }

      return stateItem
    })

    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items))
    dispatch(editItemSuccess(item))
  } catch {
    dispatch(editItemError('Item edit error'))
  }
}

export const deleteItemRequest = (itemId: Item['id']): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(startItemsLoading())

    const state = getState()
    const items = state.game.items.filter((stateItem) => stateItem.id !== itemId)

    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items))
    dispatch(deleteItemSuccess(itemId))
  } catch {
    dispatch(deleteItemError('Item delete error'))
  }
}

export const moveItemToBagRequest = (itemId: Item['id']): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(startItemsLoading())

    const state = getState()
    const baggageDate = Date.now()
    const items = state.game.items.map((stateItem) => {
      if (stateItem.id === itemId) {
        return { ...stateItem, belongsTo: DUMMY_USER_ID, baggageDate }
      }

      return stateItem
    })

    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items))
    dispatch(moveItemToBagSuccess({ itemId, baggageDate }))
  } catch {
    dispatch(moveItemToBagError('Move item to bag error'))
  }
}

export const extractItemFromBagRequest = (itemId: Item['id']): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(startItemsLoading())

    const state = getState()
    const items = state.game.items.map((stateItem) => {
      if (stateItem.id === itemId) {
        return { ...stateItem, belongsTo: null, baggageDate: null }
      }

      return stateItem
    })

    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items))
    dispatch(extractItemFromBagSuccess(itemId))
  } catch {
    dispatch(extractItemFromBagError('Extract item from bag error'))
  }
}

export const fetchRecipesRequest = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startRecipesLoading())

    const recipes = getDataFromStorage(STORAGE_KEYS.RECIPES) as Recipe[]

    if (!recipes) {
      throw new Error('Recipes data not received')
    }

    dispatch(fetchRecipesSuccess(recipes))
  } catch (error) {
    dispatch(fetchRecipesError(error.message))
  }
}

export const addRecipeRequest = (recipe: Recipe): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(startRecipesLoading())

    const state = getState()
    const recipes = [...state.game.recipes, recipe]

    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes))
    dispatch(addRecipeSuccess(recipe))
  } catch {
    dispatch(addRecipeError('Recipe add error'))
  }
}

export const editRecipeRequest = (recipe: Recipe): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(startRecipesLoading())

    const state = getState()
    const recipes = state.game.recipes.map((stateRecipe) => {
      if (stateRecipe.id === recipe.id) {
        return recipe
      }

      return stateRecipe
    })

    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes))
    dispatch(editRecipeSuccess(recipe))
  } catch {
    dispatch(editRecipeError('Recipe edit error'))
  }
}

export const deleteRecipeRequest = (recipeId: Recipe['id']): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(startRecipesLoading())

    const state = getState()
    const recipes = state.game.recipes.filter((stateRecipe) => stateRecipe.id !== recipeId)

    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes))
    dispatch(deleteRecipeSuccess(recipeId))
  } catch {
    dispatch(deleteRecipeError('Recipe delete error'))
  }
}

export const moveRecipeToBagRequest = (recipeId: Recipe['id']): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(startRecipesLoading())

    const state = getState()
    const baggageDate = Date.now()
    const recipes = state.game.recipes.map((stateRecipe) => {
      if (stateRecipe.id === recipeId) {
        return { ...stateRecipe, belongsTo: DUMMY_USER_ID, baggageDate }
      }

      return stateRecipe
    })

    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes))
    dispatch(moveRecipeToBagSuccess({ recipeId, baggageDate }))
  } catch {
    dispatch(moveRecipeToBagError('Move recipe to bag error'))
  }
}

export const extractRecipeFromBagRequest = (recipeId: Recipe['id']): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(startRecipesLoading())

    const state = getState()
    const recipes = state.game.recipes.map((stateRecipe) => {
      if (stateRecipe.id === recipeId) {
        return { ...stateRecipe, belongsTo: null, baggageDate: null }
      }

      return stateRecipe
    })

    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes))
    dispatch(extractRecipeFromBagSuccess(recipeId))
  } catch {
    dispatch(extractRecipeFromBagError('Extract recipe from bag error'))
  }
}

export default gameSlice.reducer
