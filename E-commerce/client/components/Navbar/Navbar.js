import { Box, Button, ButtonGroup, Container, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import Search from '../Searchbar/Search'

const Navbar = () => {
  return (
    <Flex m='10px' alignItems='center' gap='2' justifyContent='space-between'>
        <Box p='2'>
            <Heading size='md'>
                <Link href='/'>
                    E-Commerce
                </Link> 
            </Heading>
        </Box>
        <Search />
        <ButtonGroup gap='2'>
            <Button color='rgba(21, 76, 148, 1)'>Sign Up</Button>
            <Button colorScheme='teal'>Log in</Button>
        </ButtonGroup>
    </Flex>
  )
}

export default Navbar