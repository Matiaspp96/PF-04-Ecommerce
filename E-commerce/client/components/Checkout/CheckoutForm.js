import { Button, Center, Flex, FormControl, FormHelperText, FormLabel, Grid, Heading, Input, InputGroup, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, TagLabel, Text, useColorMode } from '@chakra-ui/react'
import Link from 'next/link'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { IoGiftOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import CardItem from '../Card/CardItem'

const CheckoutForm = () => {
    const numberItems = useSelector(state => state.shoppingCartReducer.totalItems);
    const productsCart = useSelector((state)=> state.shoppingCartReducer.itemsCart);
    const [msg, setMsg] = useState("");
    const dispatch = useDispatch();
    const { colorMode } = useColorMode()

    useEffect(()=>{
        console.log(productsCart)
    })

    const [buyer, setBuyer] = useState({
        /* user: localstorage, */
        products: productsCart,
        shipping:{
            street:"",
            state:"",
            number:0,
            floor:"",
            between:""
        },
        phone: 0,
        cost: 0,
        quantity: numberItems,
        payment: "",
      });

    const getTotalPrice = () => {
        return productsCart?.reduce((acc,item) => acc + item.totalPrice, 0).toFixed(2) 
    }

    const handleSubmit = async () => {
        
        if(Object.keys(errors).length === 0){
          if (id) {
            try {
              let response = await axios.put(`${BASEURL}/orders/${id}`, buyer) /* {
                withCredentials: true,
              }) */
              setMsg(response.data);
            } catch (error) {
              setMsg(error);
            }
          } else {
            try {
              let response = await axios.post(`${BASEURL}/orders`, buyer, {
                withCredentials: true,
              });
              setMsg(response.data);
              Swal.fire({
                title: 'Product added to the store',
                icon:'success',
                confirmButtonText: 'Cool'
              })
            } catch (error) {
              setMsg(error);
            }
          }
          setBuyer({
            name: "",
            description: "",
            price: '',
            stock: '',
            image: imgSrc,
            category: "",
          });
        //   router.push("endpoint mercado pago");
        }
      };

    return (
    <Stack w='95vw'>
        <Flex gap='0.3rem'><Link href='/'>Home</Link><Link href='/cart'>/ Cart</Link>/ Checkout</Flex>
        <Flex  flexDir={['column' ,'row']} ml={['0.5em','0.5em','2em','2em']} justify='center' >
            <Flex flexDir='column' minW='40%' gap='2em' p={['1rem','3rem']} border='1px solid #348099' borderRadius='20px'>
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
                <FormControl isRequired>
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
                <Button mt={4} colorScheme='teal' type='submit'>
                    Submit
                </Button>
            </Flex>
            <Stack bgColor={colorMode === 'light' ? 'gray.100' : 'gray.700'} w={['100%','30%']} mt={{base:'5em', md:'0'}} p='1.5rem' borderRadius='15px'>
                <Center>
                <Heading as='h4' size='md' >Your Order: {numberItems} Items</Heading>
                </Center>
            <Grid justifyItems='center' gap='0.5rem'>
            { productsCart?.map(ps=>{ return (
                    <CardItem key={ps.product._id} producto={ps.product} quantity={ps.quantity}></CardItem>
                
                    )})
            }
            </Grid>
            <Text fontWeight='bold'>Total: ${getTotalPrice()}</Text>
            <InputGroup flexDir='column' flexWrap='wrap'>
                <TagLabel>Gift card or discount code</TagLabel>
                <Flex flexDir='row'>
                <Input w={{base:'90%', md:'90%' }} bgColor={colorMode === 'light' ? 'whiteAlpha.800' : 'gray.700'} placeholder='Card...'></Input>
                <Button border= '1px solid #348099' _hover={{bgColor:'#348099'}}><IoGiftOutline  /></Button>
                </Flex>
            </InputGroup>        
            </Stack>
        </Flex>
    </Stack>
    )
  }

export default CheckoutForm