import { combineReducers } from '@reduxjs/toolkit'

import itemsReducer from '@/store/itemsSlice'
import recipesReducer from '@/store/recipesSlice'
import authReducer from '@/store/authSlice'

const rootReducer = combineReducers({
  items: itemsReducer,
  recipes: recipesReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
