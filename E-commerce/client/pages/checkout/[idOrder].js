import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import CheckoutForm from '../../components/Checkout/CheckoutForm'
import { Stack } from '@chakra-ui/react'

export default function DetailPage() {
    
    return (
      <Stack alignItems='center'>
          <Navbar />
          <CheckoutForm />
          <Footer />
      </Stack>
    )
  }