import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react"
import { useWeb3 } from "web3-hooks"
import { usePublicationContext } from "./hook/usePublicationContext"
import { usePublishingHouseContext } from "./hook/usePublishingHouseContext"

const Publication = (props) => {
  const { id, author, date, content } = props
  const [web3State] = useWeb3()
  const { publication } = usePublicationContext()
  const { publishingHouse } = usePublishingHouseContext()
  return (
    <Box mb={8} p={4} shadow={"xs"} rounded={"lg"}>
      <HStack justifyContent={"space-between"} mb={4}>
        <VStack alignItems={"start"}>
          <Text>{author}</Text>
          <Text>{date}</Text>
        </VStack>
        <HStack>
          <Text> ETH</Text>
          {web3State.account === publication.ownerOf(id) ? (
            <Button>Set Price</Button>
          ) : (
            <Button>Buy</Button>
          )}
        </HStack>
      </HStack>
      <Divider orientation="horizontal" mb={4} />

      <Text>{content}</Text>
    </Box>
  )
}
export default Publication
