import { tasksReducer, tasksSlice } from 'fatures/todolists/model/tasksSlice'
import { todolistsReducer, todolistsSlice } from 'fatures/todolists/model/todolistsSlice'
import { appReducer, appSlice } from './appSlice'
import { authReducer, authSlice } from 'fatures/auth/model/authSlice'
import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit'

/*const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})*/

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
})
// export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>

// @ts-ignore
window.store = store
