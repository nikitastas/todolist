import React from 'react'
import { Provider } from 'react-redux'
import { RootState } from './store'
import { combineReducers, legacy_createStore } from 'redux'
import { tasksReducer } from 'fatures/todolists/model/tasksSlice'
import { todolistsReducer } from 'fatures/todolists/model/todolistsSlice'
import { v1 } from 'uuid'
import { appReducer, ThemeMode } from './appSlice'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

const initialGlobalState = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all' },
    { id: 'todolistId2', title: 'What to buy', filter: 'all' },
  ],
  tasks: {
    ['todolistId1']: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: false },
    ],
    ['todolistId2']: [
      { id: v1(), title: 'Milk', isDone: false },
      { id: v1(), title: 'React Book', isDone: false },
    ],
  },
  app: {
    themeMode: 'light' as ThemeMode,
  },
}
// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as RootState)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
