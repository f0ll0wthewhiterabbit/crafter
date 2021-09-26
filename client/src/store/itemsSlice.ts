import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { Item, ItemForm } from '@/types/item.types'
import { AppThunk } from '@/store/store'
import { itemsService } from '@/services/items.api'
import { signOutRequest } from '@/store/authSlice'
import { deleteRecipeSuccess } from '@/store/recipesSlice'

type ItemsLoadingState =
  | 'fetching'
  | 'loading'
  | 'modalLoading'
  | 'bagLoading'
  | 'loaded'
  | 'crafted'
  | 'error'
  | null

interface ItemsState {
  data: Item[]
  loadingState: ItemsLoadingState
  error: string | null
}

interface FetchItemsPayload {
  items: Item[]
  isItemCrafted: boolean
}

interface MoveItemToBagPayload {
  itemId: Item['_id']
  baggageDate: Item['baggageDate']
  belongsTo: Item['belongsTo']
}

const initialState: ItemsState = {
  data: [],
  loadingState: null,
  error: null,
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    startItemsLoading(state, { payload: loadingState }: PayloadAction<ItemsLoadingState>) {
      state.loadingState = loadingState
    },
    fetchItemsSuccess(state, { payload }: PayloadAction<FetchItemsPayload>) {
      const { items, isItemCrafted } = payload

      state.data = items
      state.loadingState = isItemCrafted ? 'crafted' : 'loaded'
      state.error = null
    },
    addItemSuccess(state, { payload: item }: PayloadAction<Item>) {
      const isItemExist = state.data.some(({ _id }) => _id === item._id)

      if (!isItemExist) {
        state.data.push(item)
      }

      state.loadingState = 'loaded'
      state.error = null
    },
    editItemSuccess(state, { payload: item }: PayloadAction<Item>) {
      const itemIndex = state.data.findIndex((stateItem) => stateItem._id === item._id)

      if (itemIndex > -1) {
        state.data[itemIndex] = item
      }

      state.loadingState = 'loaded'
      state.error = null
    },
    deleteItemSuccess(state, { payload: itemId }: PayloadAction<Item['_id']>) {
      const itemIndex = state.data.findIndex((stateItem) => stateItem._id === itemId)

      if (itemIndex > -1) {
        state.data.splice(itemIndex, 1)
      }

      state.loadingState = 'loaded'
      state.error = null
    },
    moveItemToBagSuccess(state, { payload }: PayloadAction<MoveItemToBagPayload>) {
      const { itemId, baggageDate, belongsTo } = payload
      const itemIndex = state.data.findIndex((stateItem) => stateItem._id === itemId)

      if (itemIndex > -1) {
        state.data[itemIndex].belongsTo = belongsTo
        state.data[itemIndex].baggageDate = baggageDate
      }

      state.loadingState = 'loaded'
      state.error = null
    },
    extractItemFromBagSuccess(state, { payload: itemId }: PayloadAction<Item['_id']>) {
      const itemIndex = state.data.findIndex((stateItem) => stateItem._id === itemId)

      if (itemIndex > -1) {
        state.data[itemIndex].belongsTo = null
        state.data[itemIndex].baggageDate = null
        state.data.push(state.data.splice(itemIndex, 1)[0])
      }

      state.loadingState = 'loaded'
      state.error = null
    },
    setItemsError(state: ItemsState, { payload: itemsError }: PayloadAction<string>) {
      state.error = itemsError
      state.loadingState = 'error'
    },
    resetItemsError(state) {
      state.loadingState = null
      state.error = null
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
} = itemsSlice.actions

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

export default itemsSlice.reducer
