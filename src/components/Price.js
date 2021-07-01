import {
  Button,
  FormControl,
  HStack,
  Input,
  Spacer,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import { publishingHouseAddress } from "../contract/PublishingHouse"
import { usePublicationContext } from "../hook/usePublicationContext"
import { usePublishingHouseContext } from "../hook/usePublishingHouseContext"

const Price = (props) => {
  const { id, allowance } = props
  const { publication } = usePublicationContext()
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
      } else {
        toast({
          title: "Error",
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

  // Approve
  const [isLoadingApprove, setIsLoadingApprove] = useState(false)
  const handleApproveClick = async () => {
    try {
      setIsLoadingApprove(true)
      const tx = await publication.approve(publishingHouseAddress, id)
      await tx.wait()
      toast({
        title: "Approve successfull",
        description: `This token can be sold`,
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
      } else {
        toast({
          title: "Error",
          description: e.message,
          variant: "subtle",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    } finally {
      setIsLoadingApprove(false)
    }
  }

  return (
    <HStack alignItems={"center"} justifyContent={"space-between"}>
      <Button
        onClick={handleApproveClick}
        isLoading={isLoadingApprove}
        disabled={allowance}
      >
        Approve Selling
      </Button>
      <Spacer />
      <FormControl id="price" width={"20%"}>
        <Input
          type="number"
          placeholder="price value"
          value={value === 0 ? "" : value}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormControl>
      <Button onClick={handlePriceClick} isLoading={isLoadingValue}>
        Set Price
      </Button>
    </HStack>
  )
}
export default Price
