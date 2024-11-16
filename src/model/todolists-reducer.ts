import {FilterValues, Todolist} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValues
    }
}

type Actions =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: Todolist[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: v1(), title: action.payload.title, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', payload: {title}} as const
}

export const changeTodolistTitleAC = (id: string, newTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id, title: newTitle}} as const
}

export const changeTodolistFilterAC = (id: string, newFilter: FilterValues): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter: newFilter}} as const
}