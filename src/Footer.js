import { Box, Flex, Badge, Text, VStack } from "@chakra-ui/react"
import { publicationAddress } from "./contract/Publication"

const Footer = () => {
  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Badge>Deployed on Kovan</Badge>
        <Badge>NFT {publicationAddress}</Badge>
      </Flex>
    </Box>
  )
}
export default Footer
