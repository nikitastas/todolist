import s from './TodolistTitle.module.css'
import { EditableSpan } from 'common/components/EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from '../../../../model/todolistsSlice'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useCallback } from 'react'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist

  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => {
    dispatch(removeTodolistTC(id))
  }
  const updateTodolistTitleHandler = useCallback(
    (title: string) => {
      dispatch(updateTodolistTitleTC({ id, title }))
    },
    [dispatch, id, title],
  )

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
