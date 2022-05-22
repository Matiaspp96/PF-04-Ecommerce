import Navbar from '../components/Navbar/Navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Grid, Text } from '@chakra-ui/react'
import { getItemsCart } from '../redux/actions/cart';
import ProductCart from '../components/Card/ProductsCart';



export default function Cart() {
  const totalPrice = useSelector(state => state.shoppingCartReducer.totalPrice)
  return (   
    <Grid row={2}>
      <Navbar />
      <ProductCart />
      <Box>
        <Center>${!totalPrice ? 0 : totalPrice}</Center>
      </Box>
    </Grid>
  )
}
