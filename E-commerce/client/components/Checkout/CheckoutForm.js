import { Button, Center, Flex, FormControl, FormHelperText, FormLabel, Grid, Heading, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightAddon, InputRightElement, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, TagLabel, Text, useColorMode } from '@chakra-ui/react'
import Link from 'next/link'
import { BASEURL } from "../../redux/actions/products";
import axios from 'axios'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { IoGiftOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import CardItem from '../Card/CardItem'
import Swal from 'sweetalert2';

const CheckoutForm = () => {
  const itemsCart = useSelector(state=> state.shoppingCartReducer.itemsCart);
  const numberItems = useSelector(state=> state.shoppingCartReducer.totalItems);
  const dispatch = useDispatch();
  const { colorMode } = useColorMode()
  const [email, setEmail] = useState('')
  const [user, setUser] = useState('')
  // const productsCart = itemsCart?.reduce((acc,item) => acc + item.product, []) 
  const productsCart = itemsCart?.map((item) => item.product) 

  useEffect(()=>{
    let localUser
    ( async() => {
      if(localStorage.getItem('userInfo')){
        localUser = JSON.parse(localStorage.getItem('userInfo'));
      }
      setUser(localUser)
      setEmail(localUser.email) 
    })()
  })
    
  const getTotalPrice = itemsCart?.reduce((acc,item) => acc + item.totalPrice, 0).toFixed(2) 

  const [buyer, setBuyer] = useState({
      users: {email: email},
      products: productsCart,
      shipping:{
          street:"",
          state:"",
          number:0,
          floor:"",
          between:"",
          zip:0,
      },
      phone: 0,
      cost: getTotalPrice,
      quantity: numberItems,
      payment: "",
    });


    function handleChange(event){
      setBuyer(buyer => {
          let newBuyer={
              ...buyer,
              users: {email: email},
              [event.target.name]: event.target.value
          };
          /* setError(
              validateForm({
                  ...buyer,
                  [event.target.name]: event.target.value
              })
          ) */
          console.log(newBuyer)
          return newBuyer;
      })
    };

    function handleShipping(event){
      setBuyer({
        ...buyer,
        shipping:{
          ...buyer.shipping,
          [event.target.name]: event.target.value
        }
      })
    }

    async function handleSubmit(){
            try {
              console.log(buyer)
              let configAxios ={
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${user.token}`,
                },
              }
              let response = await axios.post(`${BASEURL}/orders`, buyer, configAxios)
              console.log(response)
              Swal.fire({
                title: 'Order created',
                text: 'We transfer you to the payment✔️',
                icon:'success',
                confirmButtonText: 'Accept'
              })
            } catch (error) {
              console.log(error)
            }
            setBuyer({
            users: {email: email},
            products: productsCart,
            shipping:{
                street:"",
                state:"",
                number:0,
                floor:"",
                between:"",
                zip:0
              },
              phone: 0,
              cost: getTotalPrice,
            quantity: numberItems,
            payment: ""
          });
          axios.post(/* mercadopago */)
        }

    return (
    <Stack w='95vw'>
        <Flex gap='0.3rem'><Link href='/'>Home</Link><Link href='/cart'>/ Cart</Link>/ Checkout</Flex>
        <Flex  flexDir={['column' ,'row']} ml={['0.5em','0.5em','2em','2em']} justify='center' >
            <Flex flexDir='column' minW='40%' gap='2em' p={['1rem','3rem']} border='1px solid #348099' borderRadius='20px'>
                <Heading as='h4' size='md'>Shipping information</Heading>
                {/* <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input id='firstname' name='first_name' value={first_name} onChange={e => handleChange(e)} type='text' autoComplete='off'/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input id='lastname' name='last_name' value={last_name} onChange={e => handleChange(e)} type='text' autoComplete='off'/>
                </FormControl> */}
                <FormControl isRequired>
                    <FormLabel htmlFor='state'>State</FormLabel>
                    <Select id='state' name='state' value={buyer.shipping.state} onChange={e => handleShipping(e)} placeholder='Select state'>
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
                    <Input id='address' name='street' value={buyer.shipping.street} onChange={e => handleShipping(e)} type='text'  autoComplete='off'/>
                    <FormHelperText>Add a house number if you have one</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel>Between streets (optional)</FormLabel>
                    <Input id='address' name='between' value={buyer.shipping.between} onChange={e => handleShipping(e)} type='text'  autoComplete='off'/>
                </FormControl>
                <FormControl>
                    <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                    <Input id='apartment' name='floor' value={buyer.shipping.floor} onChange={e => handleShipping(e)} type='text' autoComplete='off'/>
                    <FormHelperText></FormHelperText>
                </FormControl>
                <FormControl isRequired>
                <FormLabel htmlFor='postal code'>Postal Code</FormLabel>
                <NumberInput min={1000} >
                    <NumberInputField id='postal code' name='zip' value={buyer.shipping.zip} onChange={e => handleShipping(e)} />
                    <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                </FormControl>
                <FormControl>
                    <FormLabel>Phone (optional)</FormLabel>
                    <Input id='phone' name='phone' value={buyer.phone} onChange={e => handleChange(e)} type='num' autoComplete='off'/>
                    <FormHelperText>In case we need to contact you about your order</FormHelperText>
                </FormControl>
                <Button onClick={handleSubmit} mt={4} colorScheme='teal' type='submit'>
                    Submit
                </Button>
            </Flex>
            <Stack bgColor={colorMode === 'light' ? 'gray.100' : 'gray.700'} w={['100%','30%']} mt={{base:'5em', md:'0'}} p='1.5rem' borderRadius='15px'>
                <Center>
                <Heading as='h4' size='md' >Your Order: {numberItems} Items</Heading>
                </Center>
            <Grid justifyItems='center' gap='0.5rem'>
            { itemsCart?.map(ps=>{ return (
                    <CardItem key={ps.product._id} producto={ps.product} quantity={ps.quantity}></CardItem>
                
                    )})
            }
            </Grid>
            <Text fontWeight='bold'>Total: ${getTotalPrice}</Text>
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