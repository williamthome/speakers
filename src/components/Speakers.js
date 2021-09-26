import SpeakersToolbar from "./SpeakersToolbar"
import SpeakersList from "./SpeakersList"
import { SpeakerFilterProvider } from "../contexts/SpeakerFilterContext"

function Speakers() {
  return (
    <SpeakerFilterProvider
      initialShowSessions={true}
      initialEventYear={"2012"}
    >
      <SpeakersToolbar />
      <SpeakersList />
    </SpeakerFilterProvider>
  )
}

export default Speakers