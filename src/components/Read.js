import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Link,
  SimpleGrid,
} from "@chakra-ui/react"
import { Fragment, useState } from "react"
import { useWeb3 } from "web3-hooks"
import Buy from "./Buy"
import { usePublicationContext } from "../hook/usePublicationContext"
import { usePublishingHouseContext } from "../hook/usePublishingHouseContext"
import Publication from "./Publication"

const Read = () => {
  const [web3State] = useWeb3()
  const { publication } = usePublicationContext()
  const { publishingHouse } = usePublishingHouseContext()

  const [res, setRes] = useState([])

  // Publication by Author
  const [author, setAuthor] = useState("")
  const [isLoadingAuthor, setIsLoadingAuthor] = useState(false)
  const getPublicationByAuthor = async () => {
    setIsLoadingAuthor(true)
    const result = []
    const pubIds = await publication.getIdByAuthor(author)
    for (let i = 0; i < pubIds.length; i++) {
      const pub = await publication.getPublicationById(pubIds[i].toString())
      const owner = await publication.ownerOf(pubIds[i])
      const price = await publishingHouse.getPriceById(pubIds[i])
      const publi = {
        id: pubIds[i].toString(),
        author: pub[0],
        content: pub[1],
        hash: pub[2],
        date: new Date(pub[3].toString() * 1000).toUTCString(),
        owner: owner,
        price: Number(price.toString()),
      }
      result.push(publi)
    }
    setRes(result)
  }
  const handleAuthorClick = async () => {
    try {
      getPublicationByAuthor()
    } catch (e) {
      console.log(e)
    } finally {
      setAuthor("")
      setIsLoadingAuthor(false)
    }
  }

  // Publication by Id
  const [id, setId] = useState(0)
  const [isLoadingId, setIsLoadingId] = useState(false)
  const getPublicationById = async () => {
    setIsLoadingId(true)
    const result = []
    const pub = await publication.getPublicationById(id)
    const owner = await publication.ownerOf(id)
    const price = await publishingHouse.getPriceById(id)
    if (pub[0] !== "0x0000000000000000000000000000000000000000") {
      const publi = {
        id: id,
        author: pub[0],
        content: pub[1],
        hash: pub[2],
        date: new Date(pub[3].toString() * 1000).toUTCString(),
        owner: owner,
        price: Number(price.toString()),
      }
      result.push(publi)
    }
    setRes(result)
  }
  const handleIdClick = async () => {
    try {
      getPublicationById()
    } catch (e) {
      console.log(e)
    } finally {
      setId(0)
      setIsLoadingId(false)
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
          </SimpleGrid>

          {!isLoadingAuthor &&
            !isLoadingId &&
            res.length !== 0 &&
            res.map((pub) => {
              return (
                <Box key={pub.id} mb={8} p={4} shadow={"xs"} rounded={"lg"}>
                  <Publication
                    author={pub.author}
                    date={pub.date}
                    price={pub.price}
                    content={pub.content}
                  />
                  <Buy id={pub.id} price={pub.price} />
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
