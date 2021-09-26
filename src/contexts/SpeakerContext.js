import { createContext } from "react"

const SpeakerContext = createContext()

function SpeakerProvider({ children, speaker, updateRecord }) {
  return (
    <SpeakerContext.Provider value={{
      speaker, updateRecord,
    }}>
      {children}
    </SpeakerContext.Provider>
  )
}

export default SpeakerContext
export { SpeakerProvider }