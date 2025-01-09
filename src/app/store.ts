import { combineReducers, legacy_createStore } from "redux"
import { tasksReducer } from "../fatures/todolists/model/tasks-reducer"
import { todolistsReducer } from "../fatures/todolists/model/todolists-reducer"
import { appReducer } from "./app-reducer"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

export const store = legacy_createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
