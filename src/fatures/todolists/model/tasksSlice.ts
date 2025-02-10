import { tasksApi } from '../api/tasksApi'
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from '../api/tasksApi.types'
import { AppThunk, RootState } from 'app/store'
import { setAppStatus } from 'app/appSlice'
import { ResultCode } from 'common/enums'
import { handleServerAppError } from 'common/utils/handleServerAppError'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { createSlice } from '@reduxjs/toolkit'
import { addTodolist, removeTodolist } from './todolistsSlice'

export type TasksType = {
  [key: string]: DomainTask[]
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksType,
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
  },
  reducers: (create) => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    removeTask: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    }),
    updateTask: create.reducer<{ taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }>(
      (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      },
    ),
    clearTasks: create.reducer(() => {
      return {}
    }),
  }),
  selectors: {
    selectTasks: (state) => state,
  },
})

export const { setTasks, removeTask, addTask, updateTask, clearTasks } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors

export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    tasksApi
      .getTasks(todolistId)
      .then((res) => {
        const tasks = res.data.items
        dispatch(setTasks({ todolistId, tasks }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const removeTaskTC =
  (arg: { taskId: string; todolistId: string }): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    tasksApi
      .removeTask(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTask(arg))
          dispatch(setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const addTaskTC =
  (arg: { title: string; todolistId: string }): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    tasksApi
      .createTask(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTask({ task: res.data.data.item }))
          dispatch(setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const updateTaskTC =
  (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }): AppThunk =>
  (dispatch, getState: () => RootState) => {
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

      dispatch(setAppStatus({ status: 'loading' }))
      tasksApi
        .updateTask({ taskId, todolistId, model })
        .then((res) => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(updateTask(arg))
            dispatch(setAppStatus({ status: 'succeeded' }))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch)
        })
    }
  }
