import { Badge, Box, Button, Flex, Icon, LightMode, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

const Checkout = ({isOpen}) => {
    const totalPrice = useSelector(state => state.shoppingCartReducer.totalPrice)
    const numberItems = useSelector(state => state.shoppingCartReducer.totalItems);
    const productsCart = useSelector((state)=> state.shoppingCartReducer.itemsCart);
    const dispatch = useDispatch();

    const getTotalPrice = () => {
        return productsCart?.reduce((acc,item) => acc + item.totalPrice, 0).toFixed(2) 
    }

    useEffect(()=>{
    }, [dispatch])

    return (
    <Flex flexDir='column' justifyContent='center' alignItems='center'>
        <Text>Your Cart: {numberItems} Items</Text>
        <Text>SubTotal: ${getTotalPrice()}</Text>        
    </Flex>
    )
  }

export default Checkout