import { Box, Button, ButtonGroup, Container, Flex, Heading, Spacer, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import MenuToggle from '../Menu/MenuToggle'
import Search from '../Searchbar/Search'
import NavBarContainer from './NavBarContainer'
import MenuLinks from '../Menu/MenuLinks'
import MenuProfile from '../User/MenuProfile'

const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

  return (
        <Flex as='header' p='10px' h='auto' gap='2' justifyContent='space-between'
        top='0px'
        pos='sticky'
        w='100%'
        bgColor='#1884BE'
        zIndex='2'
        textColor='whiteAlpha.800'
        boxShadow='2xl'
        >
            <NavBarContainer {...props}>
                <Link href='/'>
                Pet Elegant
                </Link>
                <Search toggle={toggle} isOpen={isOpen}/>
                <Flex flexDir={{base:'row', md:'row-reverse'}} alignItems='center' gap='1rem'>
                <MenuToggle toggle={toggle} isOpen={isOpen} />
                <MenuProfile/>
                <MenuLinks isOpen={isOpen} />
                </Flex>
            </NavBarContainer>
            
        </Flex>
  )
}

export default Navbar
