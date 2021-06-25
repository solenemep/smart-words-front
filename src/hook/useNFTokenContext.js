import { useContext } from "react"
import { NFTokenContext } from "../context/NFTokenContext"

export const useNFTokenContext = () => {
  const context = useContext(NFTokenContext)
  if (context === undefined) {
    throw new Error(
      `It seems that you are trying to use NFTokenContext outside of its provider`
    )
  }
  return context
}
