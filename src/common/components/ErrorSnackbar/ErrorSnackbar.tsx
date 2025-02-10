import React, { SyntheticEvent } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { setAppError } from '../../../app/appSlice'

export const ErrorSnackbar = () => {
  const error = useSelector<RootState, string | null>((state) => state.app.error)
  const dispatch = useDispatch()

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(setAppError({ error: null }))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
