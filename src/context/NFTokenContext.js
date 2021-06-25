import { createContext } from "react"
import { useContract } from "web3-hooks"
import { nftokenAddress, nftokenABI } from "../contract/NFToken"

export const NFTokenContext = createContext()

export const NFTokenContextProvider = ({ children }) => {
  const nftoken = useContract(nftokenAddress, nftokenABI)
  return (
    <NFTokenContext.Provider value={{ nftoken }}>
      {children}
    </NFTokenContext.Provider>
  )
}
