import withAuth from "../hocs/withAuth"
import genShortId from "../utils/genShortId"

function SpeakerAdd({ eventYear, insertRecord, loggedInUser }) {
  if (!loggedInUser) return null

  function handleClick() {
    const name = prompt("Enter the speaker name:", "")
    if (!name) return

    const [first, ...last] = name.split(" ")

    const speaker = {
      id: genShortId(),
      first,
      last: last.join(" "),
      sessions: [
        {
          id: genShortId(),
          title: `New session for ${first}`,
          room: {
            name: "Main ball room"
          },
          eventYear,
        },
      ],
    }

    insertRecord(speaker)
  }

  return (
    <button
      className="addSes p-0 border-0 rounded-circle"
      type="button"
      onClick={handleClick}
    >
      <i className="d-flex align-items-center justify-content-center">+</i>
    </button>
  )
}

export default withAuth(SpeakerAdd)