import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import { todolistsApi } from 'fatures/todolists/api/todolistsApi'
import { tasksApi } from 'fatures/todolists/api/tasksApi'

export type ThemeMode = 'dark' | 'light'
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
    status: 'idle' as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addMatcher(isRejected, (state) => {
        state.status = 'failed'
      })
      .addMatcher(isPending, (state, action) => {
        if (
          todolistsApi.endpoints.getTodolists.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
        ) {
          return
        }
        state.status = 'loading'
      })
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { changeTheme, setAppStatus, setAppError, setIsLoggedIn } = appSlice.actions
export const appReducer = appSlice.reducer
export const { selectThemeMode, selectIsLoggedIn } = appSlice.selectors
