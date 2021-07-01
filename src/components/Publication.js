import { Divider, HStack, Text, VStack } from "@chakra-ui/react"
import { Fragment } from "react"

const Publication = (props) => {
  const { author, date, price, content } = props

  return (
    <Fragment>
      <HStack justifyContent={"space-between"} mb={4}>
        <VStack alignItems={"start"}>
          <Text>{author}</Text>
          <Text>{date}</Text>
        </VStack>
        <Text fontWeight={"bold"}>
          {price === 0 ? "Not for sale" : `${price} ETH`}
        </Text>
      </HStack>
      <Divider orientation="horizontal" mb={4} />
      <Text mb={4}>{content}</Text>
      <Divider orientation="horizontal" mb={4} />
    </Fragment>
  )
}
export default Publication
