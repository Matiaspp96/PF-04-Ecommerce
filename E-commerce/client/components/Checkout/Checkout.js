import { Badge, Box, Button, Icon, LightMode, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

const Checkout = ({isOpen}) => {
    const totalPrice = useSelector(state => state.shoppingCartReducer.totalPrice)
    const dispatch = useDispatch();

    useEffect(()=>{
    }, [dispatch])

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
                <Text></Text>
            </Stack>
        </Box>
    )
  }

export default Checkout