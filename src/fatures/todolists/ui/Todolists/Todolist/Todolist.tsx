import { AddItemForm } from 'common/components/AddItemForm'
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons'
import { Tasks } from './Tasks/Tasks'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { addTaskTC } from 'fatures/todolists/model/tasksSlice'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { memo, useCallback } from 'react'
import { DomainTodolist } from '../../../model/todolistsSlice'

type Props = {
  todolist: DomainTodolist
}

export const Todolist = memo(({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const addTaskCallback = useCallback(
    (title: string) => {
      dispatch(addTaskTC({ title, todolistId: todolist.id }))
    },
    [dispatch, todolist.id],
  )

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
})
