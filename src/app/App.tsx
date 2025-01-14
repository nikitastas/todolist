import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "common/theme"
import { Header } from "common/components/Header"
import { Main } from "./Main"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectThemeMode } from "./appSelector"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}
