import { memo, useContext, useState } from "react"
import SpeakerContext, { SpeakerProvider } from "../contexts/SpeakerContext"
import SpeakerFilterContext from "../contexts/SpeakerFilterContext"
import ErrorBoundary from "./ErrorBoundary"
import SpeakerDelete from "./SpeakerDelete"

function Session({
  title,
  room,
}) {
  return (
    <span className="session w-100">
      {title} <strong>Room: {room.name}</strong>
    </span>
  )
}

function Sessions() {
  const { speaker } = useContext(SpeakerContext)
  const { eventYear } = useContext(SpeakerFilterContext)

  const sessionsForEventYear = speaker.sessions
    .filter(s =>
      eventYear === "all"
        ? true
        : s.eventYear === eventYear
    )

  const anySessionFoEventYear = sessionsForEventYear.length > 0

  return anySessionFoEventYear && (
    <div className="sessionBox card h-250">
      {sessionsForEventYear
        .map(s => <Session key={s.id} {...s} />)
      }
    </div>
  )
}

function SpeakerImage() {
  const { speaker } = useContext(SpeakerContext)

  const {
    id,
    first,
    last,
  } = speaker

  return (
    <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
      <img
        className="contain-fit"
        src={`/images/speaker-${id}.jpg`}
        onError={(e) => { e.target.onerror = null; e.target.src = "/images/speaker-99999.jpg"; }}
        alt={`${first} ${last}`}
        width="300"
      />
    </div>
  )
}

function SpeakerFavorite() {
  const { speaker, updateRecord } = useContext(SpeakerContext)

  const [inTransition, setInTransition] = useState(false)

  function doneCallback() {
    setInTransition(false)
  }

  return (
    <div className="action padB1">
      <span onClick={() => {
        setInTransition(true)
        updateRecord(
          {
            ...speaker,
            favorite: !speaker.favorite
          },
          doneCallback
        )
      }}>
        <i className={
          `fa orange ${speaker.favorite ? "fa-star" : "fa-star-o"}`
        } />
        <span className="pl-1 pr-1">
          Favorite
        </span>
        {inTransition && <span className="fas fa-circle-notch fa-spin"></span>}
      </span>
    </div>
  )
}

function SpeakerDemographics() {
  const { speaker } = useContext(SpeakerContext)

  const {
    first,
    last,
    bio,
    company,
    twitterHandle,
    favorite,
    onFavoriteToggle,
  } = speaker

  return (
    <div className="speaker-info">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="text-truncate w-200">
          {first} {last}
        </h3>
      </div>
      <SpeakerFavorite
        favorite={favorite}
        onFavoriteToggle={onFavoriteToggle}
      />
      <div>
        <p className="card-description">
          {bio}
        </p>
        <div className="social d-flex flex-row mt-4">
          <div className="company">
            <h5>Company</h5>
            <h6>{company}</h6>
          </div>
          <div className="twitter">
            <h5>Twitter</h5>
            <h6>{twitterHandle}</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

function SpeakerNoErrorBoundary({
  speaker,
  updateRecord,
  insertRecord,
  deleteRecord,
}) {
  const { showSessions } = useContext(SpeakerFilterContext)

  return (
    <SpeakerProvider
      speaker={speaker}
      updateRecord={updateRecord}
      insertRecord={insertRecord}
      deleteRecord={deleteRecord}
    >
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4" >
        <div className="card card-height p-4 mt-4">
          <SpeakerImage />
          <SpeakerDemographics />
        </div>
        {showSessions && <Sessions />}
        <SpeakerDelete
          speaker={speaker}
          deleteRecord={deleteRecord}
        />
      </div>
    </SpeakerProvider>
  )
}

const Speaker = memo(function Speaker(props) {
  return (
    <ErrorBoundary errorUI={
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4" >
        <div className="card card-height p-4 mt-4 d-flex align-items-center justify-content-center">
          <span>Something went wrong in the speaker card</span>
        </div>
      </div>
    }>
      <SpeakerNoErrorBoundary {...props}></SpeakerNoErrorBoundary>
    </ErrorBoundary>
  )
}, areEqualSpeaker)

function areEqualSpeaker(prevProps, nextProps) {
  return prevProps.speaker.favorite === nextProps.speaker.favorite
}

export default Speaker