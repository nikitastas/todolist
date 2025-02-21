import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ListItem from '@mui/material/ListItem'
import { DomainTodolist } from '../../../../../model/todolistsSlice'
import { ChangeEvent, useCallback } from 'react'
import { getListItemSx } from './Task.tyles'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { EditableSpan } from 'common/components'
import { DomainTask, UpdateTaskModel } from '../../../../../api/tasksApi.types'
import { TaskStatus } from 'common/enums'
import { useRemoveTaskMutation, useUpdateTaskMutation } from 'fatures/todolists/api/tasksApi'

export type TaskProps = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: TaskProps) => {
  const dispatch = useAppDispatch()

  const [removeTask] = useRemoveTaskMutation()
  const removeTaskHandler = useCallback(() => {
    removeTask({ taskId: task.id, todolistId: todolist.id })
  }, [dispatch, task.id, todolist.id])

  const [updateTask] = useUpdateTaskMutation()

  const createTaskModel = (status?: number, title?: string) => {
    return {
      status: status ?? task.status,
      title: title ?? task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    } as UpdateTaskModel
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    updateTask({ taskId: task.id, todolistId: todolist.id, model: createTaskModel(status) })
  }

  const changeTaskTitleHandler = (title: string) => {
    updateTask({ taskId: task.id, todolistId: todolist.id, model: createTaskModel(undefined, title) })
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
          disabled={todolist.entityStatus === 'loading'}
        />
        <EditableSpan
          value={task.title}
          onChange={changeTaskTitleHandler}
          disabled={todolist.entityStatus === 'loading'}
        />
      </div>
      <IconButton onClick={removeTaskHandler} disabled={todolist.entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
