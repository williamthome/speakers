import axios from "axios"

function RestoreSpeakers({ setSpeakersData }) {
  async function restore() {
    const ensureRestore = confirm("Are you sure you want to restore all speakers from backup?")
    if (!ensureRestore) return

    const { data: { speakers: backup } } = await axios.get("api/backup/speakers")
    setSpeakersData(backup)
  }

  return (
    <button
      type="button"
      className="btn btn-outline-danger"
      onClick={restore}
    >
      Restore Speakers
    </button>
  )
}

export default RestoreSpeakers