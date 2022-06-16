import Navbar from '../components/Navbar/Navbar'
import { Grid, Stack } from '@chakra-ui/react'
import ProductsTop from '../components/Card/ProductsTop'
import Footer from '../components/Footer/Footer';



export default function Favorites() {
  return (   
    <Stack alignItems='center'>
      <Navbar />
      <ProductsTop />
      <Footer />
    </Stack>
  )
}
