import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import { Todolist } from './Todolist/Todolist'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { todolistsApi } from '../../api/todolistsApi'
import { selectTodolists, setTodolists } from '../../model/todolistsSlice'
import { useAppDispatch } from 'common/hooks/useAppDispatch'

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      dispatch(setTodolists({ todolists: res.data }))
    })
  }, [])

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper elevation={4} sx={{ p: '0 20px 20px 20px' }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
