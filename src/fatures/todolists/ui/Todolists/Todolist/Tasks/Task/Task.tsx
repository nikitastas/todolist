import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ListItem from '@mui/material/ListItem'
import { DomainTodolist } from '../../../../../model/todolistsSlice'
import { removeTaskTC, updateTaskTC } from 'fatures/todolists/model/tasksSlice'
import { ChangeEvent, memo, useCallback } from 'react'
import { getListItemSx } from './Task.tyles'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { EditableSpan } from 'common/components'
import { DomainTask } from '../../../../../api/tasksApi.types'
import { TaskStatus } from 'common/enums'

export type TaskProps = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = memo(({ task, todolist }: TaskProps) => {
  console.log('Task')
  const dispatch = useAppDispatch()

  const removeTaskHandler = useCallback(() => {
    dispatch(removeTaskTC({ taskId: task.id, todolistId: todolist.id }))
  }, [dispatch, task.id, todolist.id])

  const changeTaskStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
      dispatch(updateTaskTC({ taskId: task.id, todolistId: todolist.id, domainModel: { status } }))
    },
    [dispatch, task.id, todolist.id],
  )

  const changeTaskTitleHandler = useCallback(
    (title: string) => {
      dispatch(updateTaskTC({ taskId: task.id, todolistId: todolist.id, domainModel: { title } }))
    },
    [dispatch, task.id, todolist.id],
  )

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
})
