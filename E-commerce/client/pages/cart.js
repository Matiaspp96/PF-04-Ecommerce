import Navbar from '../components/Navbar/Navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Grid, SlideFade, Stack, Text } from '@chakra-ui/react'
import { getItemsCart } from '../redux/actions/cart';
import ProductCart from '../components/Card/ProductsCart';
import Footer from '../components/Footer/Footer';
import cookie from 'js-cookie'

function Cart() {
  const dispatch = useDispatch();
  useEffect(()=>{
    (async () => {
      dispatch(getItemsCart())
    })()
  }, [dispatch])

  return (    
    <Stack alignItems='center'>
      <Navbar />
      <ProductCart />
      <Footer />
    </Stack>
  )
}

export default Cart