import { createContext } from "react"
import { useContract } from "web3-hooks"
import { publicationAddress, publicationABI } from "../contract/Publication"

export const PublicationContext = createContext()

export const PublicationContextProvider = ({ children }) => {
  const publication = useContract(publicationAddress, publicationABI)
  return (
    <PublicationContext.Provider value={{ publication }}>
      {children}
    </PublicationContext.Provider>
  )
}
