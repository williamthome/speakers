import { createContext, useState } from "react"

const ThemeContext = createContext()

function ThemeProvider({ children, initialTheme }) {
  const [theme, setTheme] = useState(initialTheme)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
export { ThemeContext }
