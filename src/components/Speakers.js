import { useState } from "react"
import { data } from "../../SpeakerData"
import SpeakersToolbar from "./SpeakersToolbar"
import Header from "./Header"
import SpeakersList from "./SpeakersList"

function Speakers() {
  const [theme, setTheme] = useState("light")
  const [showSessions, setShowSessions] = useState(true)

  return (
    <div className={`container-fluid ${theme}`}>
      <Header theme={theme} />
      <SpeakersToolbar
        theme={theme}
        setTheme={setTheme}
        showSessions={showSessions}
        setShowSessions={setShowSessions}
      />
      <SpeakersList
        data={data}
        showSessions={showSessions}
      />
    </div>
  )
}

export default Speakers