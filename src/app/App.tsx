import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from 'common/theme'
import { Header } from 'common/components/Header'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { useEffect, useState } from 'react'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { ErrorSnackbar } from 'common/components'
import { Routing } from 'common/routing'
import { CircularProgress } from '@mui/material'
import s from './App.module.css'
import { selectThemeMode, setIsLoggedIn } from 'app/appSlice'
import { useMeQuery } from 'fatures/auth/api/authApi'
import { ResultCode } from 'common/enums'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const [isInitialized, setIsInitialized] = useState(false)

  const dispatch = useAppDispatch()

  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading, data])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
