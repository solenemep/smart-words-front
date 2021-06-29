import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Fragment, useState } from "react"
import { useWeb3 } from "web3-hooks"

const Read = () => {
  const [web3State] = useWeb3()
  const [res, setRes] = useState([
    {
      id: 1,
      date: "18/08/1978",
      content: "COUCOU",
      price: 32,
      owner: "0xf0e1b566859be323458d3fc6bef323ed21164ccb",
    },
    {
      id: 2,
      date: "13/04/1995",
      content: "HELLO",
      price: 97,
      owner: "0x247de9b8dFCDE2Bb10628334462B2C2e6e46BC05",
    },
  ])

  // Publication by Author
  const [author, setAuthor] = useState("")
  const handleAuthorSubmit = () => {}
  // Publication by Id
  const [id, setId] = useState(null)
  const handleIdSubmit = () => {}
  // Publication by Hash
  const [hash, setHash] = useState("")
  const handleHashSubmit = () => {}

  return (
    <Container maxW={"container.lg"} py={24}>
      <Heading as={"h2"} size="2xl" mb={16} textAlign={"center"}>
        Read
      </Heading>
      {web3State.isLogged && web3State.chainId === 42 ? (
        <Fragment>
          <SimpleGrid columns={3} spacing={8} mb={16}>
            <Box as={"form"} onSubmit={handleAuthorSubmit}>
              <FormControl id="author" mb={4}>
                <FormLabel>Author Address</FormLabel>
                <Input
                  type="text"
                  placeholder="author address"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </FormControl>
              <Button type="submit" isFullWidth>
                Get Publication by Author
              </Button>
            </Box>
            <Box as={"form"} onSubmit={handleIdSubmit}>
              <FormControl id="id" mb={4}>
                <FormLabel>Publication ID</FormLabel>
                <Input
                  type="number"
                  placeholder="publication id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </FormControl>
              <Button type="submit" isFullWidth>
                Get Publication by Id
              </Button>
            </Box>
            <Box as={"form"} onSubmit={handleHashSubmit}>
              <FormControl id="hash" mb={4}>
                <FormLabel>Publication Hash</FormLabel>
                <Input
                  type="text"
                  placeholder="publication hash"
                  value={hash}
                  onChange={(e) => setHash(e.target.value)}
                />
              </FormControl>
              <Button type="submit" isFullWidth>
                Get Publication by Hash
              </Button>
            </Box>
          </SimpleGrid>

          {res.map((pub) => {
            return (
              <Box mb={8}>
                <Text>{pub.id}</Text>
                <Text>{pub.date}</Text>
                <Text>{pub.content}</Text>
                <Text>{pub.price} ETH</Text>
                {web3State.account === pub.owner ? (
                  <Button>Set Price</Button>
                ) : (
                  <Button>Buy</Button>
                )}
              </Box>
            )
          })}
        </Fragment>
      ) : (
        <Button
          mb={16}
          as={Link}
          size={"md"}
          href={"/"}
          aria-label={"home page"}
          _hover={{ textDecoration: "none" }}
          isFullWidth
        >
          Back Home to check connection
        </Button>
      )}
    </Container>
  )
}
export default Read
