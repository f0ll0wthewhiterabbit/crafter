import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Item, ItemForm } from '@/types/item.types'
import { Recipe, RecipeForm } from '@/types/recipe.types'
import { AppThunk } from '@/store/store'
import { DUMMY_USER_ID } from '@/constants/user.constants'
import { itemsService } from '@/services/items.api'
import { recipesService } from '@/services/recipes.api'

type LoadingState =
  | 'fetching'
  | 'loading'
  | 'modalLoading'
  | 'bagLoading'
  | 'loaded'
  | 'error'
  | null

interface GameState {
  items: Item[]
  itemsLoadingState: LoadingState
  itemsError: string | null
  recipes: Recipe[]
  recipesLoadingState: LoadingState
  recipesError: string | null
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

const itemsLoadingFailed = (state: GameState, { payload: itemsError }: PayloadAction<string>) => {
  state.itemsError = itemsError
  state.itemsLoadingState = 'error'
}

const recipesLoadingFailed = (
  state: GameState,
  { payload: recipesError }: PayloadAction<string>
) => {
  state.recipesError = recipesError
  state.recipesLoadingState = 'error'
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startItemsLoading(state, { payload: loadingState }: PayloadAction<LoadingState>) {
      state.itemsLoadingState = loadingState
    },
    fetchItemsSuccess(state, { payload: items }: PayloadAction<Item[]>) {
      state.items = items
      state.itemsLoadingState = 'loaded'
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
    fetchItemsError: itemsLoadingFailed,
    addItemError: itemsLoadingFailed,
    editItemError: itemsLoadingFailed,
    deleteItemError: itemsLoadingFailed,
    moveItemToBagError: itemsLoadingFailed,
    extractItemFromBagError: itemsLoadingFailed,
    resetItemsError(state) {
      state.itemsLoadingState = null
      state.itemsError = null
    },
    startRecipesLoading(state, { payload: loadingState }: PayloadAction<LoadingState>) {
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
    deleteRecipeSuccess(state, { payload: recipeId }: PayloadAction<Recipe['_id']>) {
      const recipeIndex = state.recipes.findIndex((stateRecipe) => stateRecipe._id === recipeId)

      if (recipeIndex > -1) {
        state.recipes.splice(recipeIndex, 1)
      }

      state.recipesLoadingState = 'loaded'
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
    fetchRecipesError: recipesLoadingFailed,
    addRecipeError: recipesLoadingFailed,
    editRecipeError: recipesLoadingFailed,
    deleteRecipeError: recipesLoadingFailed,
    moveRecipeToBagError: recipesLoadingFailed,
    extractRecipeFromBagError: recipesLoadingFailed,
    resetRecipesError(state) {
      state.recipesLoadingState = null
      state.recipesError = null
    },
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
  resetItemsError,
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
  resetRecipesError,
} = gameSlice.actions

// Items request actions
export const fetchItemsRequest = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading('fetching'))

    const items = await itemsService.getItems()

    if (!items) {
      throw new Error('Items data not received')
    }

    dispatch(fetchItemsSuccess(items))
  } catch (error) {
    dispatch(fetchItemsError(error.message))
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
  } catch {
    dispatch(addItemError("Couldn't create item"))
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
  } catch {
    dispatch(editItemError("Couldn't update item"))
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
  } catch {
    dispatch(deleteItemError("Couldn't delete item"))
  }
}

export const moveItemToBagRequest = (itemId: Item['_id']): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading('bagLoading'))
    const { baggageDate, belongsTo } = await itemsService.editItem(itemId, {
      belongsTo: DUMMY_USER_ID,
    } as Partial<Item>)
    dispatch(moveItemToBagSuccess({ itemId, baggageDate, belongsTo }))
  } catch {
    dispatch(moveItemToBagError("Couldn't move item to bag"))
  }
}

export const extractItemFromBagRequest = (itemId: Item['_id']): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading('bagLoading'))
    await itemsService.editItem(itemId, { belongsTo: null } as Partial<Item>)
    dispatch(extractItemFromBagSuccess(itemId))
  } catch {
    dispatch(extractItemFromBagError("Couldn't extract item from bag"))
  }
}

// Recipes request actions
export const fetchRecipesRequest = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startRecipesLoading('fetching'))

    const recipes = await recipesService.getRecipes()

    if (!recipes) {
      throw new Error('Recipes data not received')
    }

    dispatch(fetchRecipesSuccess(recipes))
  } catch (error) {
    dispatch(fetchRecipesError(error.message))
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
  } catch {
    dispatch(addRecipeError("Couldn't create recipe"))
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
  } catch {
    dispatch(editRecipeError("Couldn't update recipe"))
  }
}

export const deleteRecipeRequest = (
  recipeId: Recipe['_id'],
  successCallback: () => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(startRecipesLoading('modalLoading'))
    await recipesService.deleteRecipe(recipeId)
    dispatch(deleteRecipeSuccess(recipeId))
    successCallback()
  } catch {
    dispatch(deleteRecipeError("Couldn't delete recipe"))
  }
}

export const moveRecipeToBagRequest = (recipeId: Recipe['_id']): AppThunk => async (dispatch) => {
  try {
    dispatch(startRecipesLoading('bagLoading'))

    const { baggageDate, belongsTo } = await recipesService.editRecipe(recipeId, {
      belongsTo: DUMMY_USER_ID,
    } as Partial<Recipe>)

    dispatch(moveRecipeToBagSuccess({ recipeId, baggageDate, belongsTo }))
  } catch {
    dispatch(moveRecipeToBagError("Couldn't move recipe to bag"))
  }
}

export const extractRecipeFromBagRequest = (recipeId: Recipe['_id']): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(startRecipesLoading('bagLoading'))
    await recipesService.editRecipe(recipeId, { belongsTo: null } as Partial<Recipe>)
    dispatch(extractRecipeFromBagSuccess(recipeId))
  } catch {
    dispatch(extractRecipeFromBagError("Couldn't extract recipe from bag"))
  }
}

export default gameSlice.reducer
