import { createContext } from "react"
import { useContract } from "web3-hooks"
import {
  publishingHouseAddress,
  publishingHouseABI,
} from "../contract/PublishingHouse"

export const PublishingHouseContext = createContext()

export const PublishingHouseContextProvider = ({ children }) => {
  const publishingHouse = useContract(
    publishingHouseAddress,
    publishingHouseABI
  )
  return (
    <PublishingHouseContext.Provider value={{ publishingHouse }}>
      {children}
    </PublishingHouseContext.Provider>
  )
}
