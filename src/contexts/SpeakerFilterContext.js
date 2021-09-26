import { createContext } from "react";
import useSpeakerFilter from "../hooks/useSpeakerFilter";

const SpeakerFilterContext = createContext()

function SpeakerFilterProvider({
  children,
  initialShowSessions,
  initialEventYear,
}) {
  const {
    showSessions, setShowSessions,
    eventYear, setEventYear,
    searchQuery, setSearchQuery,
  } = useSpeakerFilter(initialShowSessions, initialEventYear)

  return (
    <SpeakerFilterContext.Provider value={{
      showSessions, setShowSessions,
      eventYear, setEventYear,
      searchQuery, setSearchQuery,
    }}>
      {children}
    </SpeakerFilterContext.Provider>
  )
}

export default SpeakerFilterContext
export { SpeakerFilterProvider }