import Navbar from '../components/Navbar/Navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Grid, Text } from '@chakra-ui/react'
import { getItemsCart } from '../redux/actions/cart';
import ProductCart from '../components/Card/ProductsCart';



export default function Cart() {
  const itemsCart = useSelector(state => state.shoppingCartReducer.itemsCart)

  const getTotalPrice = () => {
    console.log(itemsCart)
    return itemsCart.reduce((acc,item) => acc + item.totalPrice, 0).toFixed(2) 
  }

  return (   
    <Grid row={2}>
      <Navbar />
      <ProductCart />
      <Box>
        <Center>Total: ${getTotalPrice()}</Center>
      </Box>
    </Grid>
  )
}
