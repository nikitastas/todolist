import List from '@mui/material/List'
import { DomainTodolist } from '../../../../model/todolistsSlice'
import { Task } from './Task/Task'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { TaskStatus } from 'common/enums'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useEffect } from 'react'
import { fetchTasksTC, selectTasks } from 'fatures/todolists/model/tasksSlice'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])

  const allTodolistTasks = tasks[todolist.id]

  let tasksForTodolist = allTodolistTasks

  if (todolist.filter === 'active') {
    tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === 'completed') {
    tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist && tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist &&
            tasksForTodolist.map((task) => {
              return <Task key={task.id} task={task} todolist={todolist} />
            })}
        </List>
      )}
    </>
  )
}
