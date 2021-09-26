import Speaker from "./Speaker"
import Skeleton from 'react-loading-skeleton'
import range from "../utils/range"
import useRequestDelay, { RequestStatus } from "../hooks/useRequestDelay"
import { data } from "../../SpeakerData"
import { useContext } from "react"
import SpeakerFilterContext from "../contexts/SpeakerFilterContext"

function SpeakersList() {
  const {
    data: speakersData,
    requestStatus,
    error,
    updateRecord,
  } = useRequestDelay(2000, data)

  const {
    searchQuery,
    eventYear,
  } = useContext(SpeakerFilterContext)

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
        {speakersData
          .filter(({ first, last }) => {
            if (!searchQuery) return true

            return `${first} ${last}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          })
          .map((speaker) => {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                onFavoriteToggle={(doneCallback) =>
                  updateRecord(
                    {
                      ...speaker,
                      favorite: !speaker.favorite
                    },
                    doneCallback
                  )
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