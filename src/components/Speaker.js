import { useState } from "react"

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

function Sessions({ sessions }) {
  return (
    <div className="sessionBox card h-250">
      <Session {...sessions[0]} />
    </div>
  )
}

function SpeakerImage({
  id,
  first,
  last,
}) {
  return (
    <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
      <img
        className="contain-fit"
        src={`/images/speaker-${id}.jpg`}
        alt={`${first} ${last}`}
        width="300"
      />
    </div>
  )
}

function SpeakerFavorite({ favorite, onFavoriteToggle }) {
  const [inTransition, setInTransition] = useState(false)

  function doneCallback() {
    setInTransition(false)
  }

  return (
    <div className="action padB1">
      <span onClick={() => {
        setInTransition(true)
        onFavoriteToggle(doneCallback)
      }}>
        <i className={
          `fa orange ${favorite ? "fa-star" : "fa-star-o"}`
        } />
        <span className="pl-1 pr-1">
          Favorite
        </span>
        {inTransition && <span className="fas fa-circle-notch fa-spin"></span>}
      </span>
    </div>
  )
}

function SpeakerDemographics({
  first,
  last,
  bio,
  company,
  twitterHandle,
  favorite,
  onFavoriteToggle,
}) {
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

function Speaker({
  speaker,
  showSessions,
  onFavoriteToggle,
}) {
  return (
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4" >
      <div className="card card-height p-4 mt-4">
        <SpeakerImage {...speaker} />
        <SpeakerDemographics
          {...speaker}
          onFavoriteToggle={onFavoriteToggle}
        />
      </div>
      {showSessions && <Sessions sessions={speaker.sessions} />}
    </div>
  )
}

export default Speaker