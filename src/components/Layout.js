import { useContext } from "react"
import ThemeContext, { ThemeProvider } from "../contexts/ThemeContext"

function LayoutNoThemeProvider({ children }) {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`container-fluid ${theme}`}>
      {children}
    </div>
  )
}

function Layout({ children, initialTheme }) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <LayoutNoThemeProvider>
        {children}
      </LayoutNoThemeProvider>
    </ThemeProvider>
  )
}

export default Layout