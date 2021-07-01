import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { useWeb3 } from "web3-hooks"
import { Fragment } from "react"

const Nav = () => {
  const [web3State, login] = useWeb3()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack as={"nav"} spacing={8}>
          <Button
            as={Link}
            size={"md"}
            href={"/"}
            aria-label={"home page"}
            _hover={{ textDecoration: "none" }}
          >
            Home
          </Button>
          {web3State.isLogged && web3State.chainId === 42 ? (
            <Fragment>
              <Button
                as={Link}
                size={"md"}
                href={"/write"}
                aria-label={"write page"}
                _hover={{ textDecoration: "none" }}
              >
                Write
              </Button>
              <Button
                as={Link}
                size={"md"}
                href={"/read"}
                aria-label={"archive page"}
                _hover={{ textDecoration: "none" }}
              >
                Read
              </Button>
            </Fragment>
          ) : (
            <Spacer />
          )}
        </HStack>
        <HStack spacing={8}>
          {web3State.isLogged && web3State.chainId === 42 ? (
            <Button
              as={Link}
              size={"md"}
              href={"/account"}
              aria-label={"account page"}
              _hover={{ textDecoration: "none" }}
            >
              Account
            </Button>
          ) : (
            <Spacer />
          )}
          <Button
            size={"md"}
            type="button"
            aria-label="Log"
            onClick={web3State.isLogged ? onOpen : login}
          >
            {web3State.isLogged ? "Log out" : "Log in"}
          </Button>
          <Button
            size={"md"}
            type="button"
            aria-label="Dark Mode"
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log out from dapp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              To log out from this dapp, please disconnect your MetaMask
              account.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
export default Nav
