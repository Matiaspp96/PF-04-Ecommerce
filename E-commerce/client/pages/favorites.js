import Navbar from '../components/Navbar/Navbar'
import { Grid } from '@chakra-ui/react'
import ProductsFavs from '../components/Card/ProductsFavs'



export default function Favorites() {
  return (   
    <Grid row={2}>
      <Navbar />
      <ProductsFavs />
    </Grid>
  )
}
