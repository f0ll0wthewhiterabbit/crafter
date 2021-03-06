import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Item, ItemForm } from '@/types/item.types'
import { Recipe, RecipeForm } from '@/types/recipe.types'
import { AppThunk } from '@/store/store'
import { DUMMY_USER_ID } from '@/constants/user.constants'
import { itemsService } from '@/services/items.api'
import { recipesService } from '@/services/recipes.api'

interface GameState {
  items: Item[]
  isItemsLoading: boolean
  itemsError: string | null
  recipes: Recipe[]
  isRecipesLoading: boolean
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
      const itemIndex = state.items.findIndex((stateItem) => stateItem._id === item._id)

      if (itemIndex > -1) {
        state.items[itemIndex] = item
      }

      state.isItemsLoading = false
      state.itemsError = null
    },
    deleteItemSuccess(state, { payload: itemId }: PayloadAction<Item['_id']>) {
      const itemIndex = state.items.findIndex((stateItem) => stateItem._id === itemId)

      if (itemIndex > -1) {
        state.items.splice(itemIndex, 1)
      }

      state.isItemsLoading = false
      state.itemsError = null
    },
    moveItemToBagSuccess(state, { payload }: PayloadAction<MoveItemToBagPayload>) {
      const { itemId, baggageDate, belongsTo } = payload
      const itemIndex = state.items.findIndex((stateItem) => stateItem._id === itemId)

      if (itemIndex > -1) {
        state.items[itemIndex].belongsTo = belongsTo
        state.items[itemIndex].baggageDate = baggageDate
      }

      state.isItemsLoading = false
      state.itemsError = null
    },
    extractItemFromBagSuccess(state, { payload: itemId }: PayloadAction<Item['_id']>) {
      const itemIndex = state.items.findIndex((stateItem) => stateItem._id === itemId)

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
      const recipeIndex = state.recipes.findIndex((stateItem) => stateItem._id === recipe._id)

      if (recipeIndex > -1) {
        state.recipes[recipeIndex] = recipe
      }

      state.isRecipesLoading = false
      state.recipesError = null
    },
    deleteRecipeSuccess(state, { payload: recipeId }: PayloadAction<Recipe['_id']>) {
      const recipeIndex = state.recipes.findIndex((stateRecipe) => stateRecipe._id === recipeId)

      if (recipeIndex > -1) {
        state.recipes.splice(recipeIndex, 1)
      }

      state.isRecipesLoading = false
      state.recipesError = null
    },
    moveRecipeToBagSuccess(state, { payload }: PayloadAction<MoveRecipeToBagPayload>) {
      const { recipeId, baggageDate, belongsTo } = payload
      const recipeIndex = state.recipes.findIndex((stateRecipe) => stateRecipe._id === recipeId)

      if (recipeIndex > -1) {
        state.recipes[recipeIndex].belongsTo = belongsTo
        state.recipes[recipeIndex].baggageDate = baggageDate
      }

      state.isRecipesLoading = false
      state.recipesError = null
    },
    extractRecipeFromBagSuccess(state, { payload: recipeId }: PayloadAction<Recipe['_id']>) {
      const recipeIndex = state.recipes.findIndex((stateRecipe) => stateRecipe._id === recipeId)

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

// Items request actions
export const fetchItemsRequest = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading())

    const items = await itemsService.getItems()

    if (!items) {
      throw new Error('Items data not received')
    }

    dispatch(fetchItemsSuccess(items))
  } catch (error) {
    dispatch(fetchItemsError(error.message))
  }
}

export const addItemRequest = (itemFormValues: ItemForm): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading())
    const item = await itemsService.addItem(itemFormValues)
    dispatch(addItemSuccess(item))
  } catch {
    dispatch(addItemError('Item add error'))
  }
}

export const editItemRequest = (itemId: Item['_id'], itemFormValues: ItemForm): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(startItemsLoading())
    const item = await itemsService.editItem(itemId, itemFormValues)
    dispatch(editItemSuccess(item))
  } catch {
    dispatch(editItemError('Item edit error'))
  }
}

export const deleteItemRequest = (itemId: Item['_id']): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading())
    await itemsService.deleteItem(itemId)
    dispatch(deleteItemSuccess(itemId))
  } catch {
    dispatch(deleteItemError('Item delete error'))
  }
}

export const moveItemToBagRequest = (itemId: Item['_id']): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading())
    const { baggageDate, belongsTo } = await itemsService.editItem(itemId, {
      belongsTo: DUMMY_USER_ID,
    } as Partial<Item>)
    dispatch(moveItemToBagSuccess({ itemId, baggageDate, belongsTo }))
  } catch {
    dispatch(moveItemToBagError('Move item to bag error'))
  }
}

export const extractItemFromBagRequest = (itemId: Item['_id']): AppThunk => async (dispatch) => {
  try {
    dispatch(startItemsLoading())
    await itemsService.editItem(itemId, { belongsTo: null } as Partial<Item>)
    dispatch(extractItemFromBagSuccess(itemId))
  } catch {
    dispatch(extractItemFromBagError('Extract item from bag error'))
  }
}

// Recipes request actions
export const fetchRecipesRequest = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startRecipesLoading())

    const recipes = await recipesService.getRecipes()

    if (!recipes) {
      throw new Error('Recipes data not received')
    }

    dispatch(fetchRecipesSuccess(recipes))
  } catch (error) {
    dispatch(fetchRecipesError(error.message))
  }
}

export const addRecipeRequest = (recipeFormValues: RecipeForm): AppThunk => async (dispatch) => {
  try {
    dispatch(startRecipesLoading())
    const recipe = await recipesService.addRecipe(recipeFormValues)
    dispatch(addRecipeSuccess(recipe))
  } catch {
    dispatch(addRecipeError('Recipe add error'))
  }
}

export const editRecipeRequest = (
  recipeId: Recipe['_id'],
  recipeFormValues: RecipeForm
): AppThunk => async (dispatch) => {
  try {
    dispatch(startRecipesLoading())
    const recipe = await recipesService.editRecipe(recipeId, recipeFormValues)
    dispatch(editRecipeSuccess(recipe))
  } catch {
    dispatch(editRecipeError('Recipe edit error'))
  }
}

export const deleteRecipeRequest = (recipeId: Recipe['_id']): AppThunk => async (dispatch) => {
  try {
    dispatch(startRecipesLoading())
    await recipesService.deleteRecipe(recipeId)
    dispatch(deleteRecipeSuccess(recipeId))
  } catch {
    dispatch(deleteRecipeError('Recipe delete error'))
  }
}

export const moveRecipeToBagRequest = (recipeId: Recipe['_id']): AppThunk => async (dispatch) => {
  try {
    dispatch(startRecipesLoading())

    const { baggageDate, belongsTo } = await recipesService.editRecipe(recipeId, {
      belongsTo: DUMMY_USER_ID,
    } as Partial<Recipe>)
    dispatch(moveRecipeToBagSuccess({ recipeId, baggageDate, belongsTo }))
  } catch {
    dispatch(moveRecipeToBagError('Move recipe to bag error'))
  }
}

export const extractRecipeFromBagRequest = (recipeId: Recipe['_id']): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(startRecipesLoading())
    await recipesService.editRecipe(recipeId, { belongsTo: null } as Partial<Recipe>)
    dispatch(extractRecipeFromBagSuccess(recipeId))
  } catch {
    dispatch(extractRecipeFromBagError('Extract recipe from bag error'))
  }
}

export default gameSlice.reducer
