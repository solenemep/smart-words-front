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
          <Link as={Button} size={"md"} href={"/"} aria-label={"home page"}>
            Home
          </Link>
          {web3State.isLogged && web3State.chainId === 42 ? (
            <Fragment>
              <Link
                as={Button}
                size={"md"}
                href={"/write"}
                aria-label={"write page"}
              >
                Write
              </Link>
              <Link
                as={Button}
                size={"md"}
                href={"/archive"}
                aria-label={"archive page"}
              >
                Archive
              </Link>
              <Link
                as={Button}
                size={"md"}
                href={"/transact"}
                aria-label={"transact page"}
              >
                Transact
              </Link>
            </Fragment>
          ) : (
            <Spacer />
          )}
        </HStack>
        <HStack spacing={8}>
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
