import { v1 } from "uuid"
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
  TodolistType,
} from "../todolists-reducer"

let todolistId1: string
let todolistId2: string
let startState: TodolistType[] = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]
})

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const newTitle = "New Todolist"

  const endState = todolistsReducer(startState, addTodolistAC(newTitle))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTitle)
})

test("correct todolist should change its name", () => {
  const title = "New Title"

  const endState = todolistsReducer(startState, changeTodolistTitleAC({ id: todolistId2, title }))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(title)
})

test("correct filter of todolist should be changed", () => {
  const filter = "completed"

  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(filter)
})
