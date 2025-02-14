import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import { AddItemForm } from 'common/components/AddItemForm'
import Container from '@mui/material/Container'
import { Todolists } from 'fatures/todolists/ui/Todolists/Todolists'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { useNavigate } from 'react-router'
import { Path } from 'common/routing/Routing'
import { useAddTodolistMutation } from 'fatures/todolists/api/todolistsApi'
import { selectIsLoggedIn } from 'app/appSlice'

export const Main = () => {
  const [addTodolist] = useAddTodolistMutation()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn])

  return (
    <Container fixed>
      <Grid container sx={{ mb: '30px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
