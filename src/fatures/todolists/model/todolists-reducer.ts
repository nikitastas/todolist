import { Todolist } from '../api/todolistsApi.types'
import { Dispatch } from 'redux'
import { RootState } from '../../../app/store'
import { todolistsApi } from '../api/todolistsApi'
import { RequestStatus, setAppStatusAC } from '../../../app/app-reducer'

export type FilterValues = 'all' | 'active' | 'completed'

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: Actions): DomainTodolist[] => {
  switch (action.type) {
    case 'SET-TODOLISTS': {
      return action.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
    }
    case 'REMOVE-TODOLIST': {
      return state.filter((tl) => tl.id !== action.payload.id)
    }
    case 'ADD-TODOLIST': {
      const newTodolist: DomainTodolist = {
        id: action.payload.id,
        title: action.payload.title,
        filter: 'all',
        addedDate: '',
        order: 0,
        entityStatus: 'idle',
      }
      return [newTodolist, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
    }
    case 'CHANGE-TODOLIST-ENTITY-STATUS': {
      return state.map((tl) =>
        tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.entityStatus } : tl,
      )
    }
    default:
      return state
  }
}

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof updateTodolistAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

type Actions =
  | SetTodolistsActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistEntityStatusActionType

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: 'SET-TODOLISTS', todolists } as const
}

export const removeTodolistAC = (todolistId: string) => {
  return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const
}

export const addTodolistAC = (payload: { id: string; title: string }) => {
  return { type: 'ADD-TODOLIST', payload } as const
}

export const updateTodolistAC = (payload: { id: string; title: string }) => {
  return { type: 'CHANGE-TODOLIST-TITLE', payload } as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValues }) => {
  return { type: 'CHANGE-TODOLIST-FILTER', payload } as const
}

export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
  return { type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload } as const
}

export const fetchTodolistsTC = () => (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(setAppStatusAC('loading'))
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolistsAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
  })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsApi.createTodolist(title).then((res) => {
    dispatch(addTodolistAC({ id: res.data.data.item.id, title }))
    dispatch(setAppStatusAC('succeeded'))
  })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeTodolistEntityStatusAC({ id, entityStatus: 'loading' }))
  todolistsApi.deleteTodolist(id).then((res) => {
    dispatch(removeTodolistAC(id))
    dispatch(setAppStatusAC('succeeded'))
  })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsApi.updateTodolist(arg).then((res) => {
    dispatch(updateTodolistAC(arg))
    dispatch(setAppStatusAC('succeeded'))
  })
}
