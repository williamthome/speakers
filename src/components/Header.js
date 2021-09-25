import { useContext } from "react"
import { ThemeContext } from "./App"

function Header() {
  const { theme } = useContext(ThemeContext)

  return (
    <div className="padT4 padB4">
      <div className="container mobile-container">
        <div className="d-flex justify-content-between">
          <div>
            <img
              src="/images/SVCClogo.png"
              alt="SVCC Home Page"
            />
          </div>
          <div className={theme}>
            <h4 className="header-title">
              Silicon Valley Code Camp
            </h4>
          </div>
          <div className={
            theme === "light" ? "" : "text-info"
          }>
            Hello Mr. Smith &nbsp;&nbsp;
            <span>
              <a href="#">
                sign-out
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header