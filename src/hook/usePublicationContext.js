import { useContext } from "react"
import { PublicationContext } from "../context/PublicationContext"

export const usePublicationContext = () => {
  const context = useContext(PublicationContext)
  if (context === undefined) {
    throw new Error(
      `It seems that you are trying to use PublicationContext outside of its provider`
    )
  }
  return context
}
