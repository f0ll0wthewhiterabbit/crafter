import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '@/store/store'
import { User, UserForm } from '@/types/user.types'
import { authService } from '@/services/auth.api'
import {
  clearAccessToken,
  getAccessToken,
  getUserFromAccessToken,
  isAccessTokenExpired,
  setAccessToken,
} from '@/utils/token'

type AuthLoadingState = 'loading' | 'loaded' | 'error' | null

interface AuthState {
  isAuthenticated: boolean
  isInitialized: boolean
  accessToken: string | null
  user: Pick<User, '_id' | 'email'> | null
  loadingState: AuthLoadingState
  error: string | null
}

interface SignInPayload {
  accessToken: string
  user: Pick<User, '_id' | 'email'>
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  accessToken: null,
  user: null,
  loadingState: null,
  error: null,
}

const authLoadingFailed = (state: AuthState, { payload: error }: PayloadAction<string>) => {
  state.error = error
  state.loadingState = 'error'
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading(state, { payload: loadingState }: PayloadAction<AuthLoadingState>) {
      state.loadingState = loadingState
    },
    signUpSuccess(state, { payload: user }: PayloadAction<Pick<User, '_id' | 'email'>>) {
      state.user = user
    },
    signInSuccess(state, { payload }: PayloadAction<SignInPayload>) {
      const { accessToken, user } = payload
      state.isAuthenticated = true
      state.accessToken = accessToken
      state.user = user
      state.loadingState = 'loaded'
      state.error = null
    },
    resetState(state) {
      state.isAuthenticated = false
      state.accessToken = null
      state.user = null
      state.loadingState = null
      state.error = null
    },
    finishInitialization(state) {
      state.isInitialized = true
    },
    signInError: authLoadingFailed,
    signUpError: authLoadingFailed,
  },
})

export const {
  startLoading,
  signInSuccess,
  signUpSuccess,
  resetState,
  finishInitialization,
  signInError,
  signUpError,
} = authSlice.actions

// Items request actions
export const signInRequest = (
  isInitialAuthentication: boolean,
  userFormValues?: UserForm
): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading('loading'))

    let accessToken

    if (userFormValues) {
      const signInResponse = await authService.signIn({
        email: userFormValues.email,
        password: userFormValues.password,
      })
      accessToken = signInResponse.accessToken
      setAccessToken(accessToken)
    } else {
      accessToken = getAccessToken()
    }

    if (!accessToken || isAccessTokenExpired(accessToken)) {
      dispatch(resetState())
    } else {
      const user = getUserFromAccessToken(accessToken)
      dispatch(signInSuccess({ accessToken, user }))
    }
  } catch (error) {
    dispatch(signInError('Sign in error. Please, check your credentials.'))
  } finally {
    if (isInitialAuthentication) {
      dispatch(finishInitialization())
    }
  }
}

export const signUpRequest = (userFormValues: UserForm): AppThunk => async (dispatch) => {
  try {
    dispatch(signOutRequest())
    dispatch(startLoading('loading'))

    const { email, password } = userFormValues
    const { _id } = await authService.signUp({ email, password })

    dispatch(signUpSuccess({ _id, email }))
    dispatch(signInRequest(false, { email, password }))
  } catch (error) {
    if (error.response.data.statusCode === 406) {
      dispatch(signUpError('User already exists'))
    } else {
      dispatch(signUpError("Couldn't create new user. Something went wrong."))
    }
  }
}

export const signOutRequest = (): AppThunk => (dispatch) => {
  clearAccessToken()
  dispatch(resetState())
}

export default authSlice.reducer
