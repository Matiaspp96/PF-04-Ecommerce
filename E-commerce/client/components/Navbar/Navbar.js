import { Box, Button, ButtonGroup, Container, Flex, Heading, Spacer, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import MenuToggle from '../Menu/MenuToggle'
import Search from '../Searchbar/Search'
import NavBarContainer from './NavBarContainer'
import MenuLinks from '../Menu/MenuLinks'

const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

  return (
        <Flex as='header' p='10px' h='auto' gap='2' justifyContent='space-between'
        top='0px'
        pos='fixed'
        w='100%'
        bgColor='#1884BE'
        >
            <NavBarContainer {...props}>
                    <Link href='/'> 
                        E-Commerce
                    </Link>
                <Search isOpen={isOpen}/>
                <MenuToggle toggle={toggle} isOpen={isOpen} />
                <MenuLinks isOpen={isOpen} />
                <ButtonGroup gap='2'>
                    <Button color='#6D6475'>Log in</Button>
                </ButtonGroup>
            </NavBarContainer>
            
        </Flex>
  )
}

export default Navbar