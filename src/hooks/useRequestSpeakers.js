import { useEffect, useState } from "react"
import { data } from "../../SpeakerData"
import delay from "../utils/delay"

const RequestStatus = Object.freeze({
  Loading: Symbol("loading"),
  Success: Symbol("success"),
  Failure: Symbol("failure"),
})

function useRequestSpeakers(delayTime) {
  const [speakersData, setSpeakersData] = useState([])
  const [requestStatus, setRequestStatus] = useState(RequestStatus.Loading)
  const [error, setError] = useState("")

  useEffect(() => {
    async function asyncFn() {
      try {
        await delay(delayTime)
        setSpeakersData(data)
        setRequestStatus(RequestStatus.Success)
      } catch (reason) {
        setError(reason)
        setRequestStatus(RequestStatus.Failure)
      }
    }
    asyncFn()
  }, [])

  function onFavoriteToggle(id) {
    const currentSpeaker = speakersData.find((speaker) =>
      speaker.id === id
    )

    const updatedSpeaker = {
      ...currentSpeaker,
      favorite: !currentSpeaker.favorite
    }

    const updatedData = speakersData.map(speaker =>
      speaker.id === id ? updatedSpeaker : speaker
    )

    setSpeakersData(updatedData)
  }

  return {
    speakersData,
    setSpeakersData,
    requestStatus,
    error,
    onFavoriteToggle,
  }
}

export default useRequestSpeakers
export { RequestStatus }