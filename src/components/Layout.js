import { createContext, useState } from "react"

const ThemeContext = createContext()

function Layout({ children, initialTheme }) {
  const [theme, setTheme] = useState(initialTheme)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`container-fluid ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export default Layout
export { ThemeContext }