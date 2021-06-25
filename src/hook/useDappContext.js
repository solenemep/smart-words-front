import { useContext } from "react"
import { DappContext } from "../context/DappContext"

export const useDappContext = () => {
  const context = useContext(DappContext)
  if (context === undefined) {
    throw new Error(
      `It seems that you are trying to use DappContext outside of its provider`
    )
  }
  return context
}
