import { createContext } from "react";
import useSpeakerFilter from "../hooks/useSpeakerFilter";

const SpeakerFilterContext = createContext()

function SpeakerFilterProvider({ children, initialShowSessions }) {
  const { showSessions, setShowSessions } = useSpeakerFilter(initialShowSessions)

  return (
    <SpeakerFilterContext.Provider value={{ showSessions, setShowSessions }}>
      {children}
    </SpeakerFilterContext.Provider>
  )
}

export default SpeakerFilterContext
export { SpeakerFilterProvider }