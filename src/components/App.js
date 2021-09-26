import Layout from "./Layout"
import Header from "./Header"
import Speakers from "./Speakers"

function App() {
  return (
    <Layout initialTheme="light">
      <Header />
      <Speakers />
    </Layout>
  )
}

export default App