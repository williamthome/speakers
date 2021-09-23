import { data } from "../SpeakerData"

function IndexPage() {
  const { id, bio, company, favorite, first, last, sessions, twitterHandle } = data[0]

  return (
    <div className="container speakers-list">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
            <img
              className="contain-fit"
              src={`/images/speaker-${id}.jpg`}
              alt={`${first} ${last}`}
              width="300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
