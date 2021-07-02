import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Link,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { useWeb3 } from "web3-hooks"
import { usePublicationContext } from "../hook/usePublicationContext"

const Write = () => {
  const [web3State] = useWeb3()
  const { publication } = usePublicationContext()
  const toast = useToast()

  function stringToBytes32(string) {
    const hash = ethers.utils.id(string)
    return hash
  }

  // Content
  const [content, setContent] = useState("")
  const [isLoadingContent, setIsLoadingContent] = useState(false)
  const handlePublishClick = async () => {
    try {
      setIsLoadingContent(true)
      const hash = stringToBytes32(content.trim().toLowerCase())
      const uriId = "1"
      const tx = await publication.publish(content, hash, uriId)
      await tx.wait()
      toast({
        title: "Publication successfull",
        description: `You own this publication, please set a price in Account section to be able to sell it.`,
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
      setContent("")
      setIsLoadingContent(false)
    }
  }

  return (
    <Container maxW={"container.lg"} py={24}>
      <Heading as={"h2"} size="2xl" mb={16} textAlign={"center"}>
        Write
      </Heading>
      <Text mb={16} style={{ textTransform: "uppercase" }}>
        Type your text and publish it. If the text already exists you will not
        be able to publish.
      </Text>
      {web3State.isLogged && web3State.chainId === 42 ? (
        <Box as={"form"}>
          <FormControl id="content" mb={8}>
            <Textarea
              isRequired
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your text here"
              size="lg"
              rows={12}
            />
          </FormControl>
          <Button onClick={handlePublishClick} isLoading={isLoadingContent}>
            Publish
          </Button>
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
