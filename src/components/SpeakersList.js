import { useEffect, useState } from "react"
import Speaker from "./Speaker"
import { data } from "../../SpeakerData"
import delay from "../utils/delay"

const RequestStatus = Object.freeze({
  Loading: Symbol("loading"),
  Success: Symbol("success"),
  Failure: Symbol("failure"),
})

function SpeakersList({ showSessions }) {
  const [speakersData, setSpeakersData] = useState([])
  const [requestStatus, setRequestStatus] = useState(RequestStatus.Loading)
  const [error, setError] = useState("")

  useEffect(() => {
    async function asyncFn() {
      try {
        await delay(2000)
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

  const render = {
    [RequestStatus.Loading]: (
      <div>Loading...</div>
    ),

    [RequestStatus.Failure]: (
      <div className="text-danger">
        ERROR: <b>loading Speaker Data Failed {error}</b>
      </div>
    ),

    [RequestStatus.Success]: (
      <div className="container speakers-list">
        <div className="row">
          {speakersData.map((speaker) => {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                showSessions={showSessions}
                onFavoriteToggle={() =>
                  onFavoriteToggle(speaker.id)
                }
              />
            )
          })}
        </div>
      </div>
    )
  }

  return render[requestStatus]
}

export default SpeakersList