import { AddItemForm } from 'common/components/AddItemForm'
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons'
import { Tasks } from './Tasks/Tasks'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { memo, useCallback } from 'react'
import { DomainTodolist } from '../../../model/todolistsSlice'
import { useCreateTaskMutation } from '../../../api/tasksApi'

type Props = {
  todolist: DomainTodolist
}

export const Todolist = memo(({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const [addTask] = useCreateTaskMutation()
  const addTaskCallback = useCallback(
    (title: string) => {
      addTask({ title, todolistId: todolist.id })
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
