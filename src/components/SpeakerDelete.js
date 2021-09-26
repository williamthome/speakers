function SpeakerDelete({ speaker, deleteRecord }) {
  function handleClick() {
    const ensureDelete = confirm(`Are you sure you want to delete ${speaker.first}?`)
    ensureDelete && deleteRecord(speaker)
  }

  return (
    <span className="session w-100">
      <button
        className="remSes p-0 border-0"
        type="button"
        onClick={handleClick}
      >
        <i className="m-0">-</i>
      </button>
      <span className="padL2">Delete Speaker</span>
    </span>
  )
}

export default SpeakerDelete