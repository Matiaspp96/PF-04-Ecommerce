import { SimpleGrid, Center, Box, Heading } from '@chakra-ui/react'
import Card from './Card';
import { useSelector } from 'react-redux';

export default function ProductCart() {
  const productsCart = useSelector((state)=> state.shoppingCartReducer.itemsCart);

  return (
    <Box margin={{base: '.5em', md:'1em', lg:'3em'}}>
      <Box>
        <SimpleGrid
          columns={{ base: 2, sm: 3, md: 4, lg:5 }}
          gap={'5'} 
          marginTop='2rem'>
            {productsCart.map(ps=>{ return (
              <Card key={ps.id} producto={ps.product} quantity={ps.quantity} ></Card>
            )})}
        </SimpleGrid>
      </Box>
    </Box>
    )
  }