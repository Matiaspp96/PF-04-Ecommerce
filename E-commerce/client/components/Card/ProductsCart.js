import { SimpleGrid, Center, Box, Heading, Text, Button, Flex, Stack } from '@chakra-ui/react'
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getItemsCart } from '../../redux/actions/cart';
import { AiOutlineShopping } from "react-icons/ai";
import Link from 'next/link'
import Logo from '../Logo/Logo';

export default function ProductCart() {
  const productsCart = useSelector((state)=> state.shoppingCartReducer.itemsCart);
  const numberItems = useSelector(state => state.shoppingCartReducer.totalItems);
  const dispatch = useDispatch()
  const getTotalPrice = () => {
    return productsCart?.reduce((acc,item) => acc + item.totalPrice, 0).toFixed(2) 
  }

  useEffect(()=>{
    dispatch(getItemsCart())
  }, [productsCart, dispatch])

  const [cart, setCart] = useState(productsCart)

  return (
    <Stack margin={{base: '.5em', md:'1em', lg:'2em'}} height='80vh'>
      <Flex flexDir='column' justifyContent='center' alignItems='center'>
          <Text>Your Cart: {numberItems} Items</Text>
          <Text>SubTotal: ${getTotalPrice()}</Text>        
      </Flex>
      <Box>
        {productsCart.length < 1 ? 
            <Flex flexDir='column' justifyContent='center' alignItems='center' textAlign='center'>
              <AiOutlineShopping size='150'/>
              <Text fontSize='2em'>Your shopping bag is empty</Text>
              <Link href="/"><Button pos='relative' color='blackAlpha.800' borderRadius='15px' p='1em' mt='1em'>Continue Shopping</Button></Link>
            </Flex> :
              <SimpleGrid
              columns={{ base: 2, sm: 3, md: 4, lg:4 }}
              gap={'5'} 
              margin='2rem'>{
                productsCart?.map(ps=>{ return (
                  <Card key={ps._id} producto={ps.product} quantity={ps.quantity} cart={cart} setCart={setCart}></Card>
                  )})
              }
              </SimpleGrid>}
      </Box>
    </Stack>
    )
  }