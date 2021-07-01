import { Button, HStack, Spacer, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { usePublishingHouseContext } from "./hook/usePublishingHouseContext"

const Buy = (props) => {
  const { price, id } = props
  const { publishingHouse } = usePublishingHouseContext()
  const toast = useToast()

  const [isLoadingBuy, setIsLoadingBuy] = useState(false)
  const handleBuyClick = async () => {
    try {
      setIsLoadingBuy(true)
      const tx = await publishingHouse.buy(id)
      await tx.wait()
      toast({
        title: "Purchase successfull",
        description: `You now own publication ${id}`,
        variant: "subtle",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    } catch (e) {
      if (e.code === 4001) {
        toast({
          title: "Transaction signature denied",
          description: e.message,
          variant: "subtle",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
      if (e.code === 32016) {
        toast({
          title: "Payment is not enought",
          description: e.message,
          variant: "subtle",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    } finally {
      setIsLoadingBuy(false)
    }
  }
  return (
    <HStack alignItems={"center"}>
      <Spacer />
      <Button
        onClick={handleBuyClick}
        isLoading={isLoadingBuy}
        disabled={price === 0}
      >
        Buy
      </Button>
    </HStack>
  )
}
export default Buy
