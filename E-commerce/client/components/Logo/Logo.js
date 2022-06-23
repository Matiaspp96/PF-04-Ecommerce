import { Box, Text } from '@chakra-ui/react'
import Logo from '../../public/Logo.svg'

const Logo = (props) => {
  return (
    <Box pos='relative' minW='fit-content' minH='fit-content' overflow='hidden'>
      <Image src={Logo} width='400' height='350' alt='Logo'/>
    </Box>
  )
}

export default Logo
