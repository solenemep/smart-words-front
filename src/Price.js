import { Button, FormControl, HStack, Input, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { usePublishingHouseContext } from "./hook/usePublishingHouseContext"

const Price = (props) => {
  const { id } = props
  const { publishingHouse } = usePublishingHouseContext()
  const toast = useToast()

  // SetPrice
  const [value, setValue] = useState(0)
  const [isLoadingValue, setIsLoadingValue] = useState(false)
  const handlePriceClick = async () => {
    try {
      setIsLoadingValue(true)
      const tx = await publishingHouse.setPrice(id, value)
      await tx.wait()
      toast({
        title: "Price change successfull",
        description: `Price has been set to ${value}`,
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
    } finally {
      setIsLoadingValue(false)
    }
  }

  return (
    <HStack alignItems={"center"}>
      <FormControl id="price">
        <Input
          type="number"
          placeholder="price value"
          value={value === 0 ? "" : value}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormControl>
      <Button onClick={handlePriceClick} isLoading={isLoadingValue}>
        SetPrice
      </Button>
    </HStack>
  )
}
export default Price
