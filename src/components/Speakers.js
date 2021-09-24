import { data } from "../../SpeakerData"
import SpeakersToolbar from "./SpeakersToolbar"
import Header from "./Header"
import SpeakersList from "./SpeakersList"

function Speakers() {
  return (
    <div className="container-fluid">
      <SpeakersToolbar />
      <Header />
      <SpeakersList data={data} />
    </div>
  )
}

export default Speakers