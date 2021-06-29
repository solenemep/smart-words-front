import {
  Alert,
  AlertIcon,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useWeb3 } from "web3-hooks"

const Home = () => {
  const [web3State] = useWeb3()

  return (
    <Container maxW={"container.lg"} py={24}>
      <Heading as={"h1"} size="3xl" mb={16} textAlign={"center"}>
        Welcome
      </Heading>

      <Text mb={16} style={{ textTransform: "uppercase" }}>
        This dapp allows you to create writing content and publish it. It makes
        sure your content is unique and gives you all rights on it. Basic ERC721
        functions implemented to make transactions.
      </Text>

      {web3State.isLogged ? (
        <VStack mb={16}>
          <Alert status="success" rounded={"lg"}>
            <AlertIcon />
            Connected with {web3State.account}
          </Alert>
        </VStack>
      ) : (
        <VStack mb={16}>
          <Alert status="warning" rounded={"lg"}>
            <AlertIcon />
            Please connect your MetaMask to access dapp functionalities
          </Alert>
        </VStack>
      )}
      {web3State.chainId === 42 ? (
        <VStack mb={16}>
          <Alert status="info" rounded={"lg"}>
            <AlertIcon />
            Connected to KOVAN network
          </Alert>
        </VStack>
      ) : (
        <VStack mb={16}>
          <Alert status="error" rounded={"lg"}>
            <AlertIcon />
            Please switch from {web3State.networkName} to KOVAN network
          </Alert>
        </VStack>
      )}
    </Container>
  )
}
export default Home
