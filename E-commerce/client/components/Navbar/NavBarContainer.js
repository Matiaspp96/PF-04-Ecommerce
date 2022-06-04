import { Flex } from "@chakra-ui/react"

const NavBarContainer = ({ children, ...props }) => {
    return (
      <Flex
        as="nav"
        justify="space-between"
        wrap="wrap"
        w="100%"
        h='auto'
        alignItems='center'
        justifyItems='center'
        mr='10px'
        ml='12px'
        minH={{base:'40px'}}
      >
        {children}
      </Flex>
    )
  }

export default NavBarContainer

  