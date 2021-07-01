import { Box, Flex, Badge, VStack } from "@chakra-ui/react"
import { publicationAddress } from "../contract/Publication"
import { publishingHouseAddress } from "../contract/PublishingHouse"

const Footer = () => {
  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Badge>Deployed on Kovan</Badge>
        <VStack>
          <Badge>NFT {publicationAddress}</Badge>
          <Badge>Exchange {publishingHouseAddress}</Badge>
        </VStack>
      </Flex>
    </Box>
  )
}
export default Footer
