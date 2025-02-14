import s from './TodolistTitle.module.css'
import { EditableSpan } from 'common/components/EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { DomainTodolist } from '../../../../model/todolistsSlice'
import { useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from 'fatures/todolists/api/todolistsApi'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const removeTodolistHandler = () => {
    removeTodolist(id)
  }
  const updateTodolistTitleHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan
          value={todolist.title}
          onChange={updateTodolistTitleHandler}
          disabled={entityStatus === 'loading'}
        />
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
