import { useContext } from "react"
import ThemeContext from "../contexts/ThemeContext"
import SpeakerFilterContext from "../contexts/SpeakerFilterContext"
import { EventYears } from "../hooks/useSpeakerFilter"

function SpeakersToolbar() {
  const { theme, setTheme } = useContext(ThemeContext)
  const {
    showSessions, setShowSessions,
    eventYear, setEventYear,
    searchQuery, setSearchQuery,
  } = useContext(SpeakerFilterContext)

  return (
    <section className="toolbar dark-theme-header">
      <div className="container">
        <div className="justify-content-between">
          <ul className="toolrow d-flex flex-column flex-lg-row">
            <li className="d-flex flex-column flex-md-row">
              <b>Show Sessions&nbsp;&nbsp;</b>
              <label className="fav">
                <input
                  type="checkbox"
                  checked={showSessions}
                  onChange={({ target: { checked } }) =>
                    setShowSessions(checked)
                  }
                />
                <span className="switch"></span>
              </label>
            </li>
            <li className="d-flex flex-column flex-md-row ml-sm-5 ml-0">
              <strong>Theme</strong>
              <label className="dropdown">
                <select
                  className="form-control theme"
                  value={theme}
                  onChange={({ target: { value } }) =>
                    setTheme(value)
                  }
                >
                  <option value="light">
                    Light
                  </option>
                  <option value="dark">
                    Dark
                  </option>
                </select>
              </label>
            </li>
            <li>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={({ target: { value: query } }) =>
                    setSearchQuery(query)
                  }
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-secondary"
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </li>
            <li className="d-flex flex-column flex-md-row">
              <strong>Year</strong>
              <label className="dropmenu">
                <select
                  className="from-control"
                  value={eventYear}
                  onChange={({ currentTarget: { value: year } }) =>
                    setEventYear(year)
                  }
                >
                  <option key={"all"} value={"all"}>All</option>
                  {EventYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SpeakersToolbar