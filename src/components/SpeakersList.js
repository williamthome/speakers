import Speaker from "./Speaker"
import Skeleton from 'react-loading-skeleton'
import range from "../utils/range"
import useRequestDelay, { RequestStatus } from "../hooks/useRequestDelay"
import { data } from "../../SpeakerData"
import { useContext } from "react"
import SpeakerFilterContext from "../contexts/SpeakerFilterContext"
import SpeakerAdd from "./SpeakerAdd"
import ErrorBoundary from "./ErrorBoundary"

function SpeakersList() {
  const {
    data: speakersData,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  } = useRequestDelay(2000, data)

  const { eventYear, searchQuery, } = useContext(SpeakerFilterContext)

  const render = {
    [RequestStatus.Loading]: (
      <div className="row">
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
      </div>
    ),

    [RequestStatus.Failure]: (
      <div className="text-danger">
        ERROR: <b>loading Speaker Data Failed {error}</b>
      </div>
    ),

    [RequestStatus.Success]: (
      <>
        <SpeakerAdd
          eventYear={eventYear}
          insertRecord={insertRecord}
        />
        <div className="row">
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
                  updateRecord={updateRecord}
                  insertRecord={insertRecord}
                  deleteRecord={deleteRecord}
                />
              )
            })}
        </div>
      </>
    )
  }

  return (
    <div className="container speakers-list">
      <ErrorBoundary errorUI={
        <span>Something went wrong in the speaker card</span>
      }>
        {render[requestStatus]}
      </ErrorBoundary>
    </div>
  )
}

export default SpeakersList