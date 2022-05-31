import Navbar from '../components/Navbar/Navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Grid, Stack, Text } from '@chakra-ui/react'
import { getItemsCart } from '../redux/actions/cart';
import ProductCart from '../components/Card/ProductsCart';
import Footer from '../components/Footer/Footer';



export default function Cart() {
  const itemsCart = useSelector(state => state.shoppingCartReducer.itemsCart)

  return (   
    <Stack alignItems='center'>
      <Navbar />
      <ProductCart />
      <Footer />
    </Stack>
  )
}
