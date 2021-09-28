const { createContext, useState } = require("react")

const AuthContext = createContext()

function AuthProvider({ children, initialLoggedUser }) {
  const [loggedInUser, setLoggedInUser] = useState(initialLoggedUser)

  return (
    <AuthContext.Provider value={{
      loggedInUser, setLoggedInUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export { AuthProvider }