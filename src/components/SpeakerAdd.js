function SpeakerAdd({ eventYear, insertRecord, }) {
  function handleClick() {
    const name = prompt("Enter the speaker name:", "")
    if (!name) return

    const [first, ...last] = name.split(" ")

    const speaker = {
      id: "99999",
      first,
      last: last.join(" "),
      sessions: [
        {
          id: "88888",
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

export default SpeakerAdd