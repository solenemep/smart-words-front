import { useContext } from "react"
import { PublishingHouseContext } from "../context/PublishingHouseContext"

export const usePublishingHouseContext = () => {
  const context = useContext(PublishingHouseContext)
  if (context === undefined) {
    throw new Error(
      `It seems that you are trying to use PublishingHouseContext outside of its provider`
    )
  }
  return context
}
