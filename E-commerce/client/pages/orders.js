import Navbar from '../components/Navbar/Navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Grid, Stack, Text } from '@chakra-ui/react'
import Footer from '../components/Footer/Footer';
import MenuHistory from '../components/Orderhistory/MenuHistory'

function Orders() {
  const dispatch = useDispatch();
//   useEffect(()=>{
//     (async () => {
//       dispatch(getItemsCart())
//     })()
//   }, [dispatch])

  return (   
    <Stack alignItems='center'>
      <Navbar />
      <MenuHistory />
      <Footer />
    </Stack>
  )
}

export default Orders
