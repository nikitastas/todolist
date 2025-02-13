import { Todolist } from '../api/todolistsApi.types'
import { AppThunk, RootState } from 'app/store'
import { _todolistsApi } from '../api/todolistsApi'
import { RequestStatus, setAppStatus } from 'app/appSlice'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { ResultCode } from 'common/enums'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { createSlice } from '@reduxjs/toolkit'

export type FilterValues = 'all' | 'active' | 'completed'

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

const initialState: DomainTodolist[] = []

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState,
  reducers: (create) => ({
    removeTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
    }),
    changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistFilter: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.id)
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus
      }
    }),
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
    }),
    clearTodolists: create.reducer(() => {
      return []
    }),
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const {
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
  changeTodolistFilter,
  changeTodolistEntityStatus,
  setTodolists,
  clearTodolists,
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors

export const fetchTodolistsTC = (): AppThunk => (dispatch, getState: () => RootState) => {
  dispatch(setAppStatus({ status: 'loading' }))
  _todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setTodolists({ todolists: res.data }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    _todolistsApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTodolist({ todolist: { id: res.data.data.item.id, title, addedDate: '', order: 0 } }))
          dispatch(setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const removeTodolistTC =
  (id: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    dispatch(changeTodolistEntityStatus({ id, entityStatus: 'loading' }))
    _todolistsApi
      .deleteTodolist(id)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTodolist({ id }))
          dispatch(setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        dispatch(changeTodolistEntityStatus({ id, entityStatus: 'failed' }))
        handleServerNetworkError(error, dispatch)
      })
  }

export const updateTodolistTitleTC =
  (arg: { id: string; title: string }): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    _todolistsApi
      .updateTodolist(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(changeTodolistTitle(arg))
          dispatch(setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
