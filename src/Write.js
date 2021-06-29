import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Link,
  Textarea,
} from "@chakra-ui/react"
import { useState } from "react"
import { useWeb3 } from "web3-hooks"

const Write = () => {
  const [web3State] = useWeb3()

  // Content
  const [content, setContent] = useState("")
  const handlePublishSubmit = () => {}

  return (
    <Container maxW={"container.lg"} py={24}>
      <Heading as={"h2"} size="2xl" mb={16} textAlign={"center"}>
        Write
      </Heading>
      {web3State.isLogged && web3State.chainId === 42 ? (
        <Box as={"form"} onSubmit={handlePublishSubmit}>
          <FormControl id="content" mb={8}>
            <Textarea
              isFullWidth
              isRequired
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your text here"
              size="lg"
              rows={12}
            />
          </FormControl>
          <Button type="submit">Publish</Button>
        </Box>
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
export default Write
