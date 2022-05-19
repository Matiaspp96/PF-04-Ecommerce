import { Box, Button, LightMode, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { GoClippy } from "react-icons/go";

const MenuLinks = ({isOpen}) => {
    return (
        <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }} >
        <Stack
            spacing={4}
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
            pt={[4, 4, 0, 0]}>
                <Text><Link href="/">Home</Link></Text>
                <Text><Link href="/product/categories">Categories</Link></Text>
                {/* <Link href="/orders"><Button w='fit-content' borderRadius='15px'><GoClippy size='1.5em' />Orders</Button></Link> */}
                <Link href="/cart"><Button  color='blackAlpha.800' borderRadius='15px' p='0'><IoCartOutline size='2em'/></Button></Link>
                <Link href="/cart"><Button  color='blackAlpha.800' borderRadius='15px' p='0.5em'>Log in</Button></Link>
            </Stack>
        </Box>
    )
  }

export default MenuLinks