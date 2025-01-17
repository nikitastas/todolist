import { addTodolistAC, DomainTodolist, todolistsReducer } from "../todolists-reducer"
import { TasksType, tasksReducer } from "../tasks-reducer"
import { v1 } from "uuid"

test("ids should be equals", () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: DomainTodolist[] = []
  const newId = v1()

  const action = addTodolistAC({ id: newId, title: "new todolist" })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.id)
  expect(idFromTodolists).toBe(action.payload.id)
})
