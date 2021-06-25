import { createContext } from "react"

export const DappContext = createContext()

export const DappContextProvider = ({ children }) => {
  return <DappContext.Provider value={{}}>{children}</DappContext.Provider>
}
