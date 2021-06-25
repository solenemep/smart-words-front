import { DappContextProvider } from "./context/DappContext"
import { NFTokenContextProvider } from "./context/NFTokenContext"
import Dapp from "./Dapp"

const App = () => {
  return (
    <NFTokenContextProvider>
      <DappContextProvider>
        <Dapp />
      </DappContextProvider>
    </NFTokenContextProvider>
  )
}

export default App
