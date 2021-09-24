import Speaker from "./Speaker"

function SpeakersList({ data, showSessions }) {

  function onFavoriteToggle(id) {
    const speaker = data.find((s) => s.id === id)
    console.log(speaker)
  }

  return (
    <div className="container speakers-list">
      <div className="row">
        {data.map((speaker) => {
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