import { LoginArgs } from '../api/authApi.types'
import { setAppStatus } from 'app/appSlice'
import { authApi } from '../api/authApi'
import { ResultCode } from 'common/enums'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { clearTodolists } from '../../todolists/model/todolistsSlice'
import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { clearTasks } from 'fatures/todolists/model/tasksSlice'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsInitialized: (state) => state.isInitialized,
  },
})

export const { setIsLoggedIn, setIsInitialized } = authSlice.actions
export const authReducer = authSlice.reducer
export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors

export const loginTC =
  (data: LoginArgs): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    authApi
      .login(data)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
          dispatch(setAppStatus({ status: 'succeeded' }))
          localStorage.setItem('sn-token', res.data.data.token)
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: 'succeeded' }))
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(clearTasks())
        dispatch(clearTodolists())
        localStorage.removeItem('sn-token')
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const initializeAppTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: 'succeeded' }))
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }))
    })
}
