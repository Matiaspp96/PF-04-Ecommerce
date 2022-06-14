import Navbar from '../components/Navbar/Navbar'
import { Grid, Stack } from '@chakra-ui/react'
import ProductsFavs from '../components/Card/ProductsFavs'
import Footer from '../components/Footer/Footer';



export default function Favorites() {
  return (   
    <Stack alignItems='center'>
      <Navbar />
      <ProductsFavs />
      <Footer />
    </Stack>
  )
}
