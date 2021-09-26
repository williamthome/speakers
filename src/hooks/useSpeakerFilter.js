import { useState } from "react";

function useSpeakerFilter(initialShowSessions) {
  const [showSessions, setShowSessions] = useState(initialShowSessions)

  return {
    showSessions,
    setShowSessions
  }
}

export default useSpeakerFilter