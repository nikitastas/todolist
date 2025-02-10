import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from 'common/theme'
import { Header } from 'common/components/Header'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { useEffect } from 'react'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { ErrorSnackbar } from 'common/components'
import { Routing } from 'common/routing'
import { initializeAppTC, selectIsInitialized } from 'fatures/auth/model/authSlice'
import { CircularProgress } from '@mui/material'
import s from './App.module.css'
import { selectThemeMode } from 'app/appSlice'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const isInitialized = useAppSelector(selectIsInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  /*useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])*/

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
