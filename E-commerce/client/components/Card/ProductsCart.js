import { SimpleGrid, Center, Box, Heading } from '@chakra-ui/react'
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getItemsCart } from '../../redux/actions/cart';

export default function ProductCart() {
  const productsCart = useSelector((state)=> state.shoppingCartReducer.itemsCart);
  const dispatch = useDispatch()
  const getTotalPrice = () => {
    return productsCart?.reduce((acc,item) => acc + item.totalPrice, 0).toFixed(2) 
  }

  useEffect(()=>{
    dispatch(getItemsCart())
  }, [productsCart, dispatch])

  const [cart, setCart] = useState(productsCart)

  return (
    <Box margin={{base: '.5em', md:'1em', lg:'3em'}}>
      <Box>
        <SimpleGrid
          columns={{ base: 2, sm: 3, md: 4, lg:5 }}
          gap={'5'} 
          marginTop='2rem'>
            {productsCart?.map(ps=>{ return (
              <Card key={ps.id} producto={ps.product} quantity={ps.quantity} cart={cart} setCart={setCart}></Card>
            )})}
        </SimpleGrid>
      </Box>
      <Box>
        <Center>Total: ${getTotalPrice()}</Center>
      </Box>
    </Box>
    )
  }