import { Box, Text } from '@chakra-ui/react'
import Image from 'next/image'
import logoImg from '../../public/Logo.svg'

const Logo = (props) => {
  return (
    <Box pos='relative' minW='fit-content' minH='fit-content' overflow='hidden'>
      <Image src={logoImg} width='400' height='350' alt='Logo'/>
    </Box>
  )
}

export default Logo
