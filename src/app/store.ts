import { appReducer, appSlice } from './appSlice'
import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from 'app/baseApi'

/*const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})*/

export const store = configureStore({
  reducer: {
    //[tasksSlice.name]: tasksReducer,
    //[todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})
setupListeners(store.dispatch)

// export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>

// @ts-ignore
window.store = store
