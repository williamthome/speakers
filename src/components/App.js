import { createContext, useState } from "react"
import Header from "./Header"
import Speakers from "./Speakers"

const ThemeContext = createContext()

function App() {
  const [theme, setTheme] = useState("light")

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`container-fluid ${theme}`}>
        <Header />
        <Speakers />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
export { ThemeContext }