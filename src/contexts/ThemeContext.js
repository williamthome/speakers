import { createContext } from "react"
import useTheme from "../hooks/useTheme"

const ThemeContext = createContext()

function ThemeProvider({ children, initialTheme }) {
  const { theme, setTheme } = useTheme(initialTheme)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
export { ThemeProvider }
