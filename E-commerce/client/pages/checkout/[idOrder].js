import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import CheckoutForm from '../../components/Checkout/CheckoutForm'
import { Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import router from 'next/router'

export default function CheckoutPage() {
  const itemsCart = useSelector(state=> state.shoppingCartReducer.itemsCart);

  useEffect(()=>{
    async function fetchCart(){
      if(itemsCart.length === 0){
        router.push('/')
      }
    }
    fetchCart()
  })
    
    return (
      <Stack alignItems='center'>
          <Navbar />
          <CheckoutForm />
          <Footer />
      </Stack>
    )
  }