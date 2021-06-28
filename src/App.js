import { DappContextProvider } from "./context/DappContext"
import { PublicationContextProvider } from "./context/PublicationContext"
import Dapp from "./Dapp"

const App = () => {
  return (
    <PublicationContextProvider>
      <DappContextProvider>
        <Dapp />
      </DappContextProvider>
    </PublicationContextProvider>
  )
}

export default App
