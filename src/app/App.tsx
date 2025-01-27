import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from 'common/theme'
import { Header } from 'common/components/Header'
import { Main } from './Main'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectThemeMode } from './appSelector'
import { useEffect } from 'react'
import { fetchTodolistsTC } from '../fatures/todolists/model/todolists-reducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { ErrorSnackbar } from 'common/components'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
