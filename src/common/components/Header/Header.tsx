import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { MenuButton } from '../MenuButton'
import Switch from '@mui/material/Switch'
import AppBar from '@mui/material/AppBar'
import { changeTheme, RequestStatus, ThemeMode } from 'app/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'app/store'
import { getTheme } from '../../theme'
import { LinearProgress } from '@mui/material'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { logoutTC, selectIsLoggedIn } from 'fatures/auth/model/authSlice'

export const Header = () => {
  const themeMode = useSelector<RootState, ThemeMode>((state) => state.app.themeMode)
  const theme = getTheme(themeMode)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const status = useSelector<RootState, RequestStatus>((state) => state.app.status)

  const dispatch = useDispatch<AppDispatch>()

  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
  }
  const onLogoutClickHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && <MenuButton onClick={onLogoutClickHandler}>Logout</MenuButton>}
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={'default'} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  )
}
