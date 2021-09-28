import Layout from "./Layout"
import Header from "./Header"
import Speakers from "./Speakers"
import { AuthProvider } from "../contexts/AuthContext"

function App() {
  return (
    <AuthProvider initialLoggedUser="William">
      <Layout initialTheme="light">
        <Header />
        <Speakers />
      </Layout>
    </AuthProvider>
  )
}

export default App