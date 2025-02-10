import { addTodolist, DomainTodolist, todolistsReducer } from '../todolistsSlice'
import { TasksType, tasksReducer } from 'fatures/todolists/model/tasksSlice'
import { v1 } from 'uuid'

test('ids should be equals', () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: DomainTodolist[] = []
  const newId = v1()

  const action = addTodolist({ todolist: { id: newId, title: 'new todolist', addedDate: '', order: 0 } })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
