import { useEffect, useState } from "react"
import Speaker from "./Speaker"
import { data } from "../../SpeakerData"
import delay from "../utils/delay"
import Skeleton from 'react-loading-skeleton'
import range from "../utils/range"

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
      <>
        {range(0, 3).map((i) =>
          <div
            key={i}
            className="col-xs-12 col-sm-12 col-md-6 col-lg-4"
          >
            <div className="card card-height p-4 mt-4">
              <Skeleton
                circle={true}
                height={50}
                width={50}
              />
              <Skeleton count={15} />
            </div>
          </div>
        )}
      </>
    ),

    [RequestStatus.Failure]: (
      <div className="text-danger">
        ERROR: <b>loading Speaker Data Failed {error}</b>
      </div>
    ),

    [RequestStatus.Success]: (
      <>
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
      </>
    )
  }

  return (
    <div className="container speakers-list">
      <div className="row">
        {render[requestStatus]}
      </div>
    </div>
  )
}

export default SpeakersList