import { Button, Center, Flex, FormControl, FormHelperText, FormLabel, Grid, Heading, Input, InputGroup, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, TagLabel, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { IoGiftOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import CardItem from '../Card/CardItem'

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
    <Stack m={['0.5em','0.5em','0.5em','0.5em']}>
        <Text><Link href='/'>Home </Link><Link href='/cart'> / Cart </Link>/ Checkout</Text>
        <Flex flexDir={['column' ,'row']} ml={['0.5em','0.5em','2em','2em']} justify='center' >
            <Flex flexDir='column' minW='40%' gap='2em'>
                <Heading as='h4' size='md'>Shipping information</Heading>
                <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input id='firstname' type='text' autoComplete='off'/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input id='lastname' type='text' autoComplete='off'/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor='state'>State</FormLabel>
                    <Select id='state' placeholder='Select state'>
                        <option>Buenos Aires</option>
                        <option>Catamarca</option>
                        <option>Chaco</option>
                        <option>Chubut</option>
                        <option>Córdoba</option>
                        <option>Corrientes</option>
                        <option>Entre Ríos</option>
                        <option>Formosa</option>
                        <option>Jujuy</option>
                        <option>La Pampa</option>
                        <option>La Rioja</option>
                        <option>Mendoza</option>
                        <option>Misiones</option>
                        <option>Neuquén</option>
                        <option>Río Negro</option>
                        <option>Salta</option>
                        <option>San Juan</option>
                        <option>San Luis</option>
                        <option>Santa Cruz</option>
                        <option>Santa Fe</option>
                        <option>Santiago del Estero</option>
                        <option>Tierra del Fuego</option>
                        <option>Tucumán</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Street address</FormLabel>
                    <Input id='address' type='text'  autoComplete='off'/>
                    <FormHelperText>Add a house number if you have one</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                    <Input id='apartment' type='text' autoComplete='off'/>
                    <FormHelperText></FormHelperText>
                </FormControl>
                <FormControl>
                <FormLabel htmlFor='postal code'>Postal Code</FormLabel>
                <NumberInput min={1000}>
                    <NumberInputField id='postal code' />
                    <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                </FormControl>
                <FormControl>
                    <FormLabel>Phone (optional)</FormLabel>
                    <Input id='phone' type='num' autoComplete='off'/>
                    <FormHelperText>In case we need to contact you about your order</FormHelperText>
                </FormControl>
            </Flex>
            <Stack bgColor='gray.100' w={['100%','30%']} mt={{base:'5em'}}>
                <Center>
                <Heading as='h4' size='md' >Your Cart: {numberItems} Items</Heading>
                </Center>
            <Grid templateColumns={{ base:'repeat(3, 1fr)', sm: '1fr', md:'repeat(3, 1fr)', lg:'repeat(3, 1fr)' }}
            justifyItems='center'>
            { productsCart?.map(ps=>{ return (
                    <CardItem key={ps.product._id} producto={ps.product} quantity={ps.quantity}></CardItem>
                
                    )})
            }
            </Grid>
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