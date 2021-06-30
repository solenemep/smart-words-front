import { DappContextProvider } from "./context/DappContext"
import { PublicationContextProvider } from "./context/PublicationContext"
import { PublishingHouseContextProvider } from "./context/PublishingHouseContext"
import Dapp from "./Dapp"

const App = () => {
  return (
    <PublishingHouseContextProvider>
      <PublicationContextProvider>
        <DappContextProvider>
          <Dapp />
        </DappContextProvider>
      </PublicationContextProvider>
    </PublishingHouseContextProvider>
  )
}

export default App
