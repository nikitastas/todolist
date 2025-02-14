import React from 'react'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import { Todolist } from './Todolist/Todolist'
import { useGetTodolistsQuery, useLazyGetTodolistsQuery } from '../../api/todolistsApi'

export const Todolists = () => {
  /*const [trigger, { data: todolists }] = useLazyGetTodolistsQuery()

  const fetchTodolistHandler = () => {
    trigger()
  }*/

  const { data: todolists, refetch } = useGetTodolistsQuery()

  return (
    <>
      <div>
        <button onClick={refetch}>Получить свежие данные</button>
      </div>
      {todolists?.map((tl) => {
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
