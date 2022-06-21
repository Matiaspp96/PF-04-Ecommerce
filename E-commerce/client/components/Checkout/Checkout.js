import { Button, Flex, Input, InputGroup, Stack, TagLabel, Text } from '@chakra-ui/react'
import Link from 'next/link'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { IoGiftOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { createOrderUser } from '../../redux/actions/ordersUser'

const Checkout = () => {
    const numberItems = useSelector(state => state.shoppingCartReducer.totalItems);
    const productsCart = useSelector((state)=> state.shoppingCartReducer.itemsCart);
    const dispatch = useDispatch();
    const [user, setUser] = useState(false)


    const getTotalPrice = () => {
        return productsCart?.reduce((acc,item) => acc + item.totalPrice, 0).toFixed(2) 
    }

    useEffect(()=>{
        let localUser
        ( async() => {
        if(localStorage.getItem('userInfo')){
            localUser = JSON.parse(localStorage.getItem('userInfo'));
            setUser(localUser)
        }
        })()
    }, [dispatch])

    function handleAddOrder(e){
        if(user){
            router.push('/checkout/order')
        } else {
            router.push('/login')}
    }

    return (
    <Stack ml={['0.5em','0.5em','2em','2em']} >
        <Button
        w='100%'
        h='65px'
        padding='10px 20px'
        // bgGradient='linear-gradient(to-b, #348099 60%, #51ACAD 100%)'
        bgColor='#348099'
        border= '1px solid #348099'
        font-size= '24px'
        onClick={e => handleAddOrder(e)}
        >PURCHARSE</Button>
        <Text>Your Cart: {productsCart.length} Items</Text>
        <Text>Quantity Products: {numberItems}</Text>
        <Text fontWeight='bold'>Total: ${getTotalPrice()}</Text>
        <InputGroup flexDir='column' flexWrap='wrap'>
            <TagLabel>Gift card or discount code</TagLabel>
            <Flex flexDir='row'>
            <Input w={{base:'90%', md:'90%' }} placeholder='Code or Gift...'></Input>
            <Button><IoGiftOutline /></Button>
            </Flex>
        </InputGroup>        
    </Stack>
    )
  }

export default Checkout
