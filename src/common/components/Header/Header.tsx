import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { MenuButton } from '../MenuButton'
import Switch from '@mui/material/Switch'
import AppBar from '@mui/material/AppBar'
import { changeTheme, RequestStatus, selectIsLoggedIn, setIsLoggedIn, ThemeMode } from 'app/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'app/store'
import { getTheme } from '../../theme'
import { LinearProgress } from '@mui/material'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { useLogoutMutation } from 'fatures/auth/api/authApi'
import { ResultCode } from 'common/enums'
import { baseApi } from 'app/baseApi'

export const Header = () => {
  const themeMode = useSelector<RootState, ThemeMode>((state) => state.app.themeMode)
  const theme = getTheme(themeMode)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const status = useSelector<RootState, RequestStatus>((state) => state.app.status)

  const dispatch = useDispatch<AppDispatch>()

  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
  }

  const [logout] = useLogoutMutation()

  const onLogoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem('sn-token')
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(['Todolist', 'Task']))
      })
  }

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && <MenuButton onClick={onLogoutHandler}>Logout</MenuButton>}
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={'default'} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  )
}
