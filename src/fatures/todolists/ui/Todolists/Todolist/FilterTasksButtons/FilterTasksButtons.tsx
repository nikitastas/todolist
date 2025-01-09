import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { changeTodolistFilterAC, FilterValues, TodolistType } from "../../../../model/todolists-reducer"
import { filterButtonsContainerSx } from "./FilterTasksButtons.style"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useCallback } from "react"

type Props = {
  todolist: TodolistType
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { filter, id } = todolist

  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = useCallback(
    (filter: FilterValues) => {
      dispatch(changeTodolistFilterAC({ id, filter }))
    },
    [dispatch, id],
  )

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterTasksHandler("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilterTasksHandler("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilterTasksHandler("completed")}
      >
        Completed
      </Button>
      {/*<ButtonWithMemo variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterTasksHandler('all')}>
                All
            </ButtonWithMemo>
            <ButtonWithMemo variant={filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterTasksHandler('active')}>
                Active
            </ButtonWithMemo>
            <ButtonWithMemo variant={filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilterTasksHandler('completed')}>
                Completed
            </ButtonWithMemo>*/}
    </Box>
  )
}
