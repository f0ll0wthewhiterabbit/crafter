import { combineReducers } from '@reduxjs/toolkit'

import gameReducer from '@/store/gameSlice'
import authReducer from '@/store/authSlice'

const rootReducer = combineReducers({
  game: gameReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
