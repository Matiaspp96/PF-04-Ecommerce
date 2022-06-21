import { Button, Center, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, Heading, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightAddon, InputRightElement, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Progress, Select, Stack, TagLabel, Text, useColorMode } from '@chakra-ui/react'
import Link from 'next/link'
import { BASEURL } from "../../redux/actions/products";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoGiftOutline, IoLocationOutline } from 'react-icons/io5'
import { GiPostStamp } from 'react-icons/gi'
import { AiOutlineBorderlessTable } from 'react-icons/ai'
import { MdOutlineApartment, MdOutlineLocationSearching } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import CardItem from '../Card/CardItem'
import Swal from 'sweetalert2';
import formValidate from './formValidations';
import { AiOutlinePhone } from 'react-icons/ai';
import router from 'next/router';
import { deleteAllCart } from '../../redux/actions/cart';

const CheckoutForm = () => {
  const itemsCart = useSelector(state=> state.shoppingCartReducer.itemsCart);
  const numberItems = useSelector(state=> state.shoppingCartReducer.totalItems);
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  //se agrega la propiedad quantity a product
  itemsCart.forEach(element => {
    element.product.quantity = element.quantity;
  });
  const productsCart = itemsCart?.map((item) => item.product);
  let itemsMP = itemsCart?.map((item) => typeof item === 'object' ? {description:item.product.name, unit_price:item.product.price, quantity:item.quantity } : null);
  const [buyerMP, setBuyerMP] = useState();
  const [buyer, setBuyer] = useState();
  const [error, setError] = useState({});
  

  useEffect(()=>{
    let localUser
    async function fetchDataUser(){
      if(user === ''){

        if(localStorage.getItem('userInfo')){
          localUser = JSON.parse(localStorage.getItem('userInfo'));
        };
       
        setUser(localUser)
        setEmail(localUser.email)
        setBuyer({
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
          payment: "MercadoPago",
        })
        setBuyerMP({
          ...buyerMP,
          items: itemsMP,
          phone: 0,
        })
        setIsLoading(false)
      }
    }
    fetchDataUser()
  })
    
  const getTotalPrice = itemsCart?.reduce((acc,item) => acc + item.totalPrice, 0).toFixed(2) 

  
  function handleChange(event){
    setBuyer(buyer => {
      let dateNew = new Date().toLocaleDateString() + " " + new Date().toTimeString().slice(0,8)
        let newBuyer={
            ...buyer,
            users: {email: email},
            [event.target.name]: event.target.value,
            cost: getTotalPrice,
            quantity: numberItems,
            date: dateNew,
        };
        console.log(newBuyer)
        return newBuyer;
    })
    setBuyerMP(buyer => {
      let newBuyer={
          ...buyer,
          email: email,
          name: user.name,
          [event.target.name]: event.target.value
      };
      return newBuyer;
    })
  };

  function handleShipping(event){
    setBuyer(buyer => {
      let newBuyer = {
        ...buyer,
        shipping:{
          ...buyer.shipping,
          [event.target.name]: event.target.value
      }}
      setError(
        formValidate({
          ...buyer,
          shipping:{
            ...buyer.shipping,
            [event.target.name]: event.target.value
        }
        })
      )
      return newBuyer
    })
    console.log(error)
  }

  async function handleSubmit(){
    try {
      if(buyer.shipping.state && buyer.shipping.zip && buyer.users && buyer.shipping.street){
        console.log(buyer)
        let configAxios ={
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${user.token}`,
          },
        }
        let response = await axios.post(`${BASEURL}/orders`, buyer, configAxios)
        setBuyer({
          users: {email: ""},
          products: [],
          shipping:{
            street:"",
            state:"",
            number:0,
            floor:"",
            between:"",
            zip:0
          },
          phone: 0,
          cost: 0,
          quantity: numberItems,
          payment: ""
        });
        console.log(response.data._id)
        setBuyerMP(buyerMP=>{
          let newBuyerMP = {
          ...buyerMP,
          idOrder: response.data._id
          }
        return newBuyerMP})
        buyerMP.idOrder = response.data._id;
    
        Swal.fire({
          title: 'Order created',
          text: 'We transfer you to the payment✔️',
          icon:'success',
          confirmButtonText: 'Accept'
        })
        let responsePayment = await axios.post(`${BASEURL}/payments/checkoutmp`, buyerMP, configAxios)
        dispatch(deleteAllCart())
        router.push(responsePayment.data.preference.body.sandbox_init_point)
      } else {
        Swal.fire({
          title: 'Complete all required fields',
          icon:'error',
          confirmButtonText: 'Accept'
        })
      }
    } catch (error) {
      console.log(error)
    }
    
  // axios.post(/* mercadopago */)
  }

  if(isLoading){
    return (
      <Center h={"100vh"}>
        <Stack>
          <Heading>Just a moment</Heading>
          <Progress size="md" isIndeterminate />
        </Stack>
      </Center>
    )
  }


  return (
  <Stack w='95vw'>
      <Flex gap='0.3rem'><Link href='/'>Home</Link><Link href='/cart'>/ Cart</Link>/ Checkout</Flex>
      <Flex zIndex='1' flexDir={['column' ,'row']} ml={['0.5em','0.5em','2em','2em']} justify='center' >
          <Flex flexDir='column' minW='40%' gap='2em' p={['1rem','3rem']} border='1px solid #348099' borderRadius='20px'
          boxShadow='xl'>
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
                  <Select required id='state' name='state' value={buyer.shipping.state} onChange={e => handleShipping(e)} placeholder='Select state'>
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
                  {error.state ? <FormHelperText color='red.400'>{error.state}</FormHelperText> : null}
              </FormControl>
              <FormControl isRequired>
                  <FormLabel>Street address</FormLabel>
                  <InputGroup>
                  <InputLeftElement pointerEvents='none'><IoLocationOutline color='gray.300' /></InputLeftElement>
                  <Input placeholder='Address...' id='address' name='street' value={buyer.shipping.street} onChange={e => handleShipping(e)} type='text'  autoComplete='off'/>
                  </InputGroup>
                  {error.street ? <FormHelperText color='red.400'>{error.street}</FormHelperText> : <FormHelperText>Add a house number if you have one</FormHelperText>}
              </FormControl>
              <FormControl>
                  <FormLabel>Between streets (optional)</FormLabel>
                  <InputGroup>
                  <InputLeftElement pointerEvents='none'><AiOutlineBorderlessTable color='gray.300' /></InputLeftElement>
                  <Input placeholder='Between...' name='between' value={buyer.shipping.between} onChange={e => handleShipping(e)} type='text'  autoComplete='off'/>
                  </InputGroup>
              </FormControl>
              <FormControl>
                  <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                  <InputGroup>
                  <InputLeftElement pointerEvents='none'><MdOutlineApartment color='gray.300' /></InputLeftElement>
                  <Input id='apartment' name='floor' value={buyer.shipping.floor} onChange={e => handleShipping(e)}
                  placeholder='Floor...' type='text' autoComplete='off'/>
                  </InputGroup>
              </FormControl>
              <FormControl isRequired>
              <FormLabel htmlFor='postal code'>Postal Code</FormLabel>
              <InputGroup>
              <NumberInput min={1000}>
                  <NumberInputField placeholder='Zip...' id='postal code' name='zip' value={buyer.shipping.zip} onChange={e => handleShipping(e)} />
                  <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                  </NumberInputStepper>
              </NumberInput>
              </InputGroup>
              {error.zip ? <FormHelperText color='red.400'>{error.zip}</FormHelperText> : null}
              </FormControl>
              <FormControl isRequired>
                  <FormLabel>Phone</FormLabel>
                  <InputGroup>
                  <InputLeftElement pointerEvents='none'><AiOutlinePhone color='gray.300' /></InputLeftElement>
                  <Input placeholder='Phone...' id='phone' name='phone' value={buyer.phone} onChange={e => handleChange(e)} type='num' autoComplete='off'/>
                  </InputGroup>
                  <FormHelperText>In case we need to contact you about your order</FormHelperText>
              </FormControl>
              <Button onClick={handleSubmit} mt={4} colorScheme='teal' type='submit'>
                  Submit
              </Button>
          </Flex>
          <Stack zIndex='1' boxShadow='lg' bgColor={colorMode === 'light' ? 'gray.100' : 'gray.700'} w={['100%','30%']} mt={{base:'5em', md:'0'}} p='1.5rem' borderRadius='15px'>
              <Center>
              <Heading as='h4' size='md' >Your Order: {itemsCart.length} Items</Heading>
              </Center>
          <Grid justifyItems='center' gap='0.5rem'>
          { itemsCart?.map(ps=>{ return (
            <CardItem key={ps.product._id} producto={ps.product} quantity={ps.quantity}></CardItem>
            
            )})
          }
          </Grid>
          <Text fontWeight='bold'>Total: ${getTotalPrice}</Text>
          <Text size='md' >Quantity Products: {numberItems} products</Text>
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
