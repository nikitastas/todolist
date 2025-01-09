import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TasksType,
  tasksReducer,
} from "../tasks-reducer"
import { addTodolistAC, removeTodolistAC } from "../todolists-reducer"

let startState: TasksType = {}

beforeEach(() => {
  startState = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(
    startState,
    removeTaskAC({
      taskId: "2",
      todolistId: "todolistId2",
    }),
  )

  expect(endState).toEqual({
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "3", title: "tea", isDone: false },
    ],
  })
})

test("correct task should be added to correct array", () => {
  const endState = tasksReducer(startState, addTaskAC({ title: "juice", todolistId: "todolistId2" }))

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juice")
  expect(endState["todolistId2"][0].isDone).toBe(false)
})

test("status of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    changeTaskStatusAC({
      taskId: "2",
      isDone: false,
      todolistId: "todolistId2",
    }),
  )

  expect(startState).not.toBe(endState)
  expect(startState).not.toEqual(endState)
  expect(startState["todolistId2"][1].id).toBe(endState["todolistId2"][1].id)
  expect(startState["todolistId2"][1]).not.toEqual(endState["todolistId2"][1])
  expect(endState["todolistId2"][1].isDone).toEqual(false)
})

test("title of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    changeTaskTitleAC({
      taskId: "2",
      title: "Whey powder, Creatine, Trenbolone acetate",
      todolistId: "todolistId2",
    }),
  )

  expect(startState).not.toBe(endState)
  expect(startState).not.toEqual(endState)
  expect(startState["todolistId2"][1]).not.toBe(endState["todolistId2"][1])
  expect(startState["todolistId2"][1].title).not.toEqual(endState["todolistId2"][1].title)
  expect(endState["todolistId2"][1].title).toEqual("Whey powder, Creatine, Trenbolone acetate")
})

test("new array should be added when new todolist is added", () => {
  const endState = tasksReducer(startState, addTodolistAC("new todolist"))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const action = removeTodolistAC("todolistId2")

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
  // or
  expect(endState["todolistId2"]).toBeUndefined()
})
