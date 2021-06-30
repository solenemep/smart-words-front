import { Container, Heading, Button, Link, Text, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useWeb3 } from "web3-hooks"
import { usePublicationContext } from "./hook/usePublicationContext"
import Publication from "./Publication"

const Account = () => {
  const [web3State] = useWeb3()
  const { publication } = usePublicationContext()
  const [res, setRes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (publication) {
      const getPublicationByOwner = async () => {
        try {
          setRes([])
          setIsLoading(true)
          const account = await web3State.account
          const balanceOf = await publication.balanceOf(account)
          for (let index = 0; index < balanceOf; index++) {
            const pubId = await publication.tokenOfOwnerByIndex(account, index)
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
          setIsLoading(false)
        }
      }
      getPublicationByOwner()
    }
  }, [publication])

  return (
    <Container maxW={"container.lg"} py={24}>
      <Heading as={"h2"} size="2xl" mb={16} textAlign={"center"}>
        Your publications
      </Heading>
      {web3State.isLogged && web3State.chainId === 42 ? (
        <Box>
          {res.length !== 0 &&
            !isLoading &&
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
