import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer'
import { Dispatch } from 'redux'
import { tasksApi } from '../api/tasksApi'
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from '../api/tasksApi.types'
import { RootState } from '../../../app/store'
import { setAppErrorAC, setAppStatusAC } from '../../../app/app-reducer'
import { ResultCode } from 'common/enums'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'

export type TasksType = {
  [key: string]: DomainTask[]
}

const initialState = {}

export const tasksReducer = (state: TasksType = initialState, action: Actions): TasksType => {
  switch (action.type) {
    case 'SET-TASKS': {
      return { ...state, [action.payload.todolistId]: action.payload.tasks }
    }
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    }
    case 'ADD-TASK': {
      const newTask = action.payload.task
      return {
        ...state,
        [newTask.todoListId]: [newTask, ...state[newTask.todoListId]],
      }
    }
    case 'UPDATE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, ...action.payload.domainModel } : t,
        ),
      }
    }
    case 'ADD-TODOLIST': {
      return { ...state, [action.payload.id]: [] }
    }
    case 'REMOVE-TODOLIST': {
      let stateCopy = { ...state }
      delete stateCopy[action.payload.id]
      return stateCopy
    }

    default:
      return state
  }
}

export type SetTasksActionType = ReturnType<typeof setTasksAC>

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

type Actions =
  | UpdateTaskActionType
  | SetTasksActionType
  | RemoveTaskActionType
  | AddTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: 'SET-TASKS',
    payload,
  } as const
}

export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return { type: 'REMOVE-TASK', payload } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: 'ADD-TASK', payload } as const
}

export const updateTaskAC = (payload: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) => {
  return { type: 'UPDATE-TASK', payload } as const
}

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  tasksApi.getTasks(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setTasksAC({ todolistId, tasks }))
    dispatch(setAppStatusAC('succeeded'))
  })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  tasksApi.removeTask(arg).then((res) => {
    dispatch(removeTaskAC(arg))
    dispatch(setAppStatusAC('succeeded'))
  })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  tasksApi
    .createTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTaskAC({ task: res.data.data.item }))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC =
  (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const { taskId, todolistId, domainModel } = arg

    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find((t) => t.id === taskId)

    if (task) {
      const model: UpdateTaskModel = {
        status: domainModel.status !== undefined ? domainModel.status : task.status,
        title: domainModel.title ? domainModel.title : task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
      }

      dispatch(setAppStatusAC('loading'))
      tasksApi
        .updateTask({ taskId, todolistId, model })
        .then((res) => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(updateTaskAC(arg))
            dispatch(setAppStatusAC('succeeded'))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch)
        })
    }
  }
