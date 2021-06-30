import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"
import { Fragment, useState } from "react"
import { useWeb3 } from "web3-hooks"
import { usePublicationContext } from "./hook/usePublicationContext"
import Publication from "./Publication"

const Read = () => {
  const [web3State] = useWeb3()
  const { publication } = usePublicationContext()

  const [res, setRes] = useState([])

  // Publication by Author
  const [author, setAuthor] = useState("")
  const [isLoadingAuthor, setIsLoadingAuthor] = useState(false)
  const handleAuthorClick = async () => {
    try {
      setRes([])
      setIsLoadingAuthor(true)
      const pubIds = await publication.getIdByAuthor(author)
      for (let i = 0; i < pubIds.length; i++) {
        const pub = await publication.getPublicationById(pubIds[i].toString())
        const publi = {
          id: pubIds[i].toString(),
          author: pub[0],
          content: pub[1],
          hash: pub[2],
          date: new Date(pub[3].toString() * 1000).toUTCString(),
        }
        setRes([...res, publi])
      }
    } catch (e) {
      console.log(e)
    } finally {
      setAuthor("")
      setIsLoadingAuthor(false)
    }
  }

  // Publication by Owner
  const [owner, setOwner] = useState("")
  const [isLoadingOwner, setIsLoadingOwner] = useState(false)
  const handleOwnerClick = async () => {
    try {
      setRes([])
      setIsLoadingOwner(true)
      const balanceOf = await publication.balanceOf(owner)
      for (let index = 0; index < balanceOf; index++) {
        const pubId = await publication.tokenOfOwnerByIndex(owner, index)
        const pub = await publication.getPublicationById(pubId)
        const publi = {
          id: index,
          author: pub[0],
          content: pub[1],
          hash: pub[2],
          date: new Date(pub[3].toString() * 1000).toUTCString(),
        }
        setRes([...res, publi])
      }
    } catch (e) {
      console.log(e)
    } finally {
      setOwner("")
      setIsLoadingOwner(false)
    }
  }

  // Publication by Id
  const [id, setId] = useState(0)
  const [isLoadingId, setIsLoadingId] = useState(false)
  const handleIdClick = async () => {
    try {
      setRes([])
      setIsLoadingId(true)
      const pub = await publication.getPublicationById(id)
      if (pub[0] !== "0x0000000000000000000000000000000000000000") {
        const publi = {
          id: id,
          author: pub[0],
          content: pub[1],
          hash: pub[2],
          date: new Date(pub[3].toString() * 1000).toUTCString(),
        }
        setRes([...res, publi])
      }
    } catch (e) {
      console.log(e)
    } finally {
      setId(0)
      setIsLoadingId(false)
    }
  }

  // Publication by Hash
  const [hash, setHash] = useState("")
  const [isLoadingHash, setIsLoadingHash] = useState(false)
  const handleHashClick = async () => {
    try {
      setRes([])
      setIsLoadingHash(true)
      const idPub = await publication.getIdByHash(hash)
      const pub = await publication.getPublicationById(idPub)
      if (pub[0] !== "0x0000000000000000000000000000000000000000") {
        const publi = {
          id: idPub,
          author: pub[0],
          content: pub[1],
          hash: pub[2],
          date: new Date(pub[3].toString() * 1000).toUTCString(),
        }
        setRes([...res, publi])
      }
    } catch (e) {
      console.log(e)
    } finally {
      setHash("")
      setIsLoadingHash(false)
    }
  }

  return (
    <Container maxW={"container.lg"} py={24}>
      <Heading as={"h2"} size="2xl" mb={16} textAlign={"center"}>
        Read
      </Heading>
      {web3State.isLogged && web3State.chainId === 42 ? (
        <Fragment>
          <SimpleGrid columns={2} spacing={8} mb={16}>
            <Box as={"form"}>
              <FormControl id="author" mb={4}>
                <Input
                  type="text"
                  placeholder="author address"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </FormControl>
              <Button
                onClick={handleAuthorClick}
                isLoading={isLoadingAuthor}
                isFullWidth
              >
                Get Publication by Author
              </Button>
            </Box>
            <Box as={"form"}>
              <FormControl id="owner" mb={4}>
                <Input
                  type="text"
                  placeholder="owner address"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                />
              </FormControl>
              <Button
                onClick={handleOwnerClick}
                isLoading={isLoadingOwner}
                isFullWidth
              >
                Get Publication by Owner
              </Button>
            </Box>
            <Box as={"form"}>
              <FormControl id="id" mb={4}>
                <Input
                  type="number"
                  placeholder="publication id"
                  value={id === 0 ? "" : id}
                  onChange={(e) => setId(e.target.value)}
                />
              </FormControl>
              <Button
                onClick={handleIdClick}
                isLoading={isLoadingId}
                isFullWidth
              >
                Get Publication by Id
              </Button>
            </Box>
            <Box as={"form"}>
              <FormControl id="hash" mb={4}>
                <Input
                  type="text"
                  placeholder="publication hash"
                  value={hash}
                  onChange={(e) => setHash(e.target.value)}
                />
              </FormControl>
              <Button
                onClick={handleHashClick}
                isLoading={isLoadingHash}
                isFullWidth
              >
                Get Publication by Hash
              </Button>
            </Box>
          </SimpleGrid>

          {res.length !== 0 &&
            !isLoadingAuthor &&
            !isLoadingOwner &&
            !isLoadingId &&
            !isLoadingHash &&
            res.map((pub) => {
              return (
                <Publication
                  key={pub.id}
                  id={pub.id}
                  author={pub.author}
                  date={pub.date}
                  content={pub.content}
                />
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
