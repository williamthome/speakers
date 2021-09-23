import { data } from "../SpeakerData"

function IndexPage() {
  return (
    <div className="container speakers-list">
      <div className="row">
        {data.map(({
          id,
          bio,
          company,
          favorite,
          first,
          last,
          sessions,
          twitterHandle,
        }) =>
          <div
            key={id}
            className="col-xs-12 col-sm-12 col-md-6 col-lg-4"
          >
            <div className="card card-height p-4 mt-4">
              <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
                <img
                  className="contain-fit"
                  src={`/images/speaker-${id}.jpg`}
                  alt={`${first} ${last}`}
                  width="300"
                />
              </div>
              <div className="speaker-info">
                <div className="d-flex justify-content-between mb-3">
                  <h3 className="text-truncate w-200">
                    {first} {last}
                  </h3>
                </div>
                <div>
                  <p>{bio} {company} {twitterHandle} {favorite}</p>
                </div>
              </div>
              <div className="sessionBox card h-250">
                <span className="session w-100">
                  {sessions[0].title} <strong>Room: {sessions[0].room.name}</strong>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default IndexPage
