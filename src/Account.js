import { Container, Heading, Button, Link, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useWeb3 } from "web3-hooks"
import { usePublicationContext } from "./hook/usePublicationContext"
import { usePublishingHouseContext } from "./hook/usePublishingHouseContext"
import Price from "./Price"
import Publication from "./Publication"

const Account = () => {
  const [web3State] = useWeb3()
  const { publication } = usePublicationContext()
  const { publishingHouse } = usePublishingHouseContext()
  const [res, setRes] = useState([])
  const [isLoadingOwner, setIsLoadingOwner] = useState(false)

  // Publication by Owner
  useEffect(() => {
    if (publication) {
      const getPublicationByOwner = async () => {
        setIsLoadingOwner(true)
        const result = []
        const account = await web3State.account
        const balanceOf = await publication.balanceOf(account)
        for (let index = 0; index < balanceOf; index++) {
          const pubId = await publication.tokenOfOwnerByIndex(account, index)
          const pub = await publication.getPublicationById(pubId)
          const owner = await publication.ownerOf(pubId)
          const price = await publishingHouse.getPriceById(pubId)
          const publi = {
            id: pubId,
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
      try {
        getPublicationByOwner()
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoadingOwner(false)
      }
    }
  }, [publication, publishingHouse, web3State])

  return (
    <Container maxW={"container.lg"} py={24}>
      <Heading as={"h2"} size="2xl" mb={16} textAlign={"center"}>
        Your publications
      </Heading>
      {web3State.isLogged && web3State.chainId === 42 ? (
        <Box>
          {!isLoadingOwner &&
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
                  <Price id={pub.id} />
                </Box>
              )
            })}
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
export default Account
