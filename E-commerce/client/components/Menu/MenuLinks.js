import { Box, LightMode, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const MenuLinks = ({isOpen}) => {
    return (
        <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }} >
        <Stack
            spacing={8}
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
            pt={[4, 4, 0, 0]}>
                <Text><Link href="/">Home</Link></Text>
                <Text><Link href="/product/categories">Categories</Link></Text>
                <Text><Link href="/orders">Orders</Link></Text>
                <Text><Link href="/cart">Cart</Link></Text>
            </Stack>
        </Box>
    )
  }

export default MenuLinks