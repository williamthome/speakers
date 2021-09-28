import { useContext } from "react"
import ThemeContext from "../contexts/ThemeContext"
import withAuth from "../hocs/withAuth"

function Header({ loggedInUser, setLoggedInUser }) {
  const { theme } = useContext(ThemeContext)

  function LoggedIn({ loggedInUser, setLoggedInUser }) {
    function logout() {
      setLoggedInUser("")
    }

    return (
      <div>
        <span className="pr-2">Logged in as {loggedInUser}</span>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    )
  }

  function NotLoggedIn({ setLoggedInUser }) {
    function login() {
      const username = prompt("Enter your username", "")
      if (!username) return

      setLoggedInUser(username)
    }

    return (
      <button
        type="button"
        className="btn btn-secondary"
        onClick={login}
      >
        Login
      </button>
    )
  }

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
            <h4 className={`header-title ${theme === "light" ? "" : "text-info"}`}>
              Silicon Valley Code Camp
            </h4>
          </div>
          <div className={
            theme === "light" ? "" : "text-info"
          }>
            {loggedInUser
              ? <LoggedIn loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
              : <NotLoggedIn setLoggedInUser={setLoggedInUser} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(Header)