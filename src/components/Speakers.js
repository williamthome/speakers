import { data } from "../../SpeakerData"
import SpeakersList from "./SpeakersList"

function Speakers() {
  return (
    <div className="container-fluid">
      <SpeakersList data={data} />
    </div>
  )
}

export default Speakers