import {FilterValues, TodolistType} from '../app/App';
import {v1} from 'uuid';

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: Actions): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: action.payload.todolistId, title: action.payload.title, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            return state
    }
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type Actions =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}

export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', payload: {title, todolistId: v1()}} as const
}

export const changeTodolistTitleAC = (payload: {id: string, title: string}) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload} as const
}

export const changeTodolistFilterAC = (payload: {id: string, filter: FilterValues}) => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload} as const
}