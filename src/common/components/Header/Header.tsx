import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { MenuButton } from '../MenuButton'
import Switch from '@mui/material/Switch'
import AppBar from '@mui/material/AppBar'
import { changeThemeAC, RequestStatus, ThemeMode } from '../../../app/app-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { getTheme } from '../../theme'
import { LinearProgress } from '@mui/material'

export const Header = () => {
  const themeMode = useSelector<RootState, ThemeMode>((state) => state.app.themeMode)
  const theme = getTheme(themeMode)

  const status = useSelector<RootState, RequestStatus>((state) => state.app.status)

  const dispatch = useDispatch()

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
  }

  return (
    <AppBar position="static" sx={{ mb: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          <MenuButton>Login</MenuButton>
          <MenuButton>Logout</MenuButton>
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={'default'} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  )
}
