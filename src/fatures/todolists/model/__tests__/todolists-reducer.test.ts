import { v1 } from 'uuid'
import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  DomainTodolist,
  removeTodolist,
  todolistsReducer,
} from '../todolistsSlice'

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
    { id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
  ]
})

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolist({ id: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  const newTitle = 'New Todolist'
  const newId = v1()
  const endState = todolistsReducer(
    startState,
    addTodolist({ todolist: { id: newId, title: newTitle, addedDate: '', order: 0 } }),
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTitle)
})

test('correct todolist should change its name', () => {
  const title = 'New Title'

  const endState = todolistsReducer(startState, changeTodolistTitle({ id: todolistId2, title }))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(title)
})

test('correct filter of todolist should be changed', () => {
  const filter = 'completed'

  const endState = todolistsReducer(startState, changeTodolistFilter({ id: todolistId2, filter }))

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(filter)
})
