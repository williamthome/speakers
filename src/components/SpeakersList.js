import { useEffect, useState } from "react"
import Speaker from "./Speaker"
import { data } from "../../SpeakerData"
import delay from "../utils/delay"

function SpeakersList({ showSessions }) {

  const [speakersData, setSpeakersData] = useState([])

  useEffect(() => {
    async function asyncFn() {
      await delay(2000)
      setSpeakersData(data)
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

  return (
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

export default SpeakersList