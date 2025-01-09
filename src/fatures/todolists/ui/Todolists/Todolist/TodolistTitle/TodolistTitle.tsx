import s from "./TodolistTitle.module.css"
import { EditableSpan } from "common/components/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTodolistTitleAC, removeTodolistAC, TodolistType } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useCallback } from "react"

type Props = {
  todolist: TodolistType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id } = todolist

  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(id))
  }
  const updateTodolistTitleHandler = useCallback(() => {
    dispatch(changeTodolistTitleAC({ id, title }))
  }, [dispatch, id, title])

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={todolist.title} onChange={updateTodolistTitleHandler} />
      </h3>
      <IconButton onClick={removeTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
