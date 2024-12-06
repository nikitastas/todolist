import {Tasks} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

const initialState = {}
export const tasksReducer = (state: Tasks = initialState, action: Actions): Tasks => {
    switch(action.type) {
        case 'REMOVE-TASK': {
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.taskId)}
        }
        case 'ADD-TASK': {
            return {...state,
                [action.payload.todolistId]:
                    [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t)}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }

        default:
            return state
    }
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type Actions =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const removeTaskAC = (payload: { taskId: string, todolistId: string }) => {
    return { type: 'REMOVE-TASK', payload } as const
}

export const addTaskAC = (payload: { title: string, todolistId: string }) => {
    return { type: 'ADD-TASK', payload } as const
}

export const changeTaskStatusAC = (payload: { taskId: string, isDone: boolean , todolistId: string }) => {
    return { type: 'CHANGE-TASK-STATUS', payload } as const
}

export const changeTaskTitleAC = (payload: { taskId: string, newTitle: string, todolistId: string }) => {
    return { type: 'CHANGE-TASK-TITLE', payload } as const
}


