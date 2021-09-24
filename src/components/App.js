import { useState } from "react"
import { data } from "../../SpeakerData"
import Header from "./Header"
import Speakers from "./Speakers"

function App() {
  const [theme, setTheme] = useState("light")

  return (
    <div className={`container-fluid ${theme}`}>
      <Header theme={theme} />
      <Speakers
        data={data}
        theme={theme}
        setTheme={setTheme}
      />
    </div>
  )
}

export default App