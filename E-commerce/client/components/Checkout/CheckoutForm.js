import { Button, Flex, Input, InputGroup, Stack, TagLabel, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { IoGiftOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

const CheckoutForm = () => {
    const numberItems = useSelector(state => state.shoppingCartReducer.totalItems);
    const productsCart = useSelector((state)=> state.shoppingCartReducer.itemsCart);
    const dispatch = useDispatch();

    const getTotalPrice = () => {
        return productsCart?.reduce((acc,item) => acc + item.totalPrice, 0).toFixed(2) 
    }

    useEffect(()=>{
    }, [dispatch])

    return (
    <Stack ml={['0.5em','0.5em','2em','2em']}>
        <Text>Home / Cart / Checkout </Text>
        <Flex flexDir='row' ml={['0.5em','0.5em','2em','2em']} >
            <Flex flexDir='column' minW='40%'>
                <InputGroup>
                <TagLabel>Shipping information</TagLabel>
                </InputGroup>
            </Flex>
            <Stack bgColor='gray.100' w='30%'>
            <Text>Your Cart: {numberItems} Items</Text>
            <Text>SubTotal: ${getTotalPrice()}</Text>
            <InputGroup flexDir='column' flexWrap='wrap'>
                <TagLabel>Gift card or discount code</TagLabel>
                <Flex flexDir='row'>
                <Input w={{base:'90%', md:'90%' }} bgColor='whiteAlpha.800' placeholder='Card...'></Input>
                <Button border= '1px solid #348099' _hover={{bgColor:'#348099'}}><IoGiftOutline  /></Button>
                </Flex>
            </InputGroup>        
            </Stack>
        </Flex>
    </Stack>
    )
  }

export default CheckoutForm