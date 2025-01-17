import { Todolist } from "../api/todolistsApi.types"
import { Dispatch } from "redux"
import { RootState } from "../../../app/store"
import { todolistsApi } from "../api/todolistsApi"

export type FilterValues = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: Actions): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
    }
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id)
    }
    case "ADD-TODOLIST": {
      const newTodolist: DomainTodolist = {
        id: action.payload.id,
        title: action.payload.title,
        filter: "all",
        addedDate: "",
        order: 0,
      }
      return [newTodolist, ...state]
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
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

type Actions =
  | SetTodolistsActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}

export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id: todolistId } } as const
}

export const addTodolistAC = (payload: { id: string; title: string }) => {
  return { type: "ADD-TODOLIST", payload } as const
}

export const updateTodolistAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValues }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}

export const fetchTodolistsThunk = (dispatch: Dispatch, getState: () => RootState) => {
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolistsAC(res.data))
  })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistsApi.createTodolist(title).then((res) => {
    dispatch(addTodolistAC({ id: res.data.data.item.id, title }))
  })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  todolistsApi.deleteTodolist(id).then((res) => {
    dispatch(removeTodolistAC(id))
  })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
  todolistsApi.updateTodolist(arg).then((res) => {
    dispatch(updateTodolistAC(arg))
  })
}
