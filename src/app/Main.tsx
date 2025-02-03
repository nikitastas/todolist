import React, { useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import { AddItemForm } from 'common/components/AddItemForm'
import Container from '@mui/material/Container'
import { addTodolistTC } from '../fatures/todolists/model/todolists-reducer'
import { Todolists } from '../fatures/todolists/ui/Todolists/Todolists'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectIsLoggedIn } from '../fatures/auth/model/authSelectors'
import { useNavigate } from 'react-router'
import { Path } from 'common/routing/Routing'

export const Main = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login)
    }
  }, [isLoggedIn])

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title))
    },
    [dispatch],
  )

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
