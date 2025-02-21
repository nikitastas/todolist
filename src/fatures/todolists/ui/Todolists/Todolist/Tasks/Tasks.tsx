import List from '@mui/material/List'
import { Task } from './Task/Task'
import { TaskStatus } from 'common/enums'
import { useGetTasksQuery } from 'fatures/todolists/api/tasksApi'
import { TasksSkeleton } from 'fatures/todolists/ui/skeletons/TasksSkeleton/TasksSkeleton'
import { DomainTodolist } from '../../../../lib/types/types'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { data, isLoading } = useGetTasksQuery(todolist.id)

  let tasksForTodolist = data?.items

  if (todolist.filter === 'active') {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === 'completed') {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return <TasksSkeleton />
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
