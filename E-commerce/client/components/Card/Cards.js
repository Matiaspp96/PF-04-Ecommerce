
import { Grid, Center, Box } from '@chakra-ui/react'
import Card from './Card';
import { useSelector } from 'react-redux';

export default function Cards() {
  const productos = useSelector((state)=> state.productReducer.products);

  return (
    <Box margin='3em'>
      <Center fontSize='4xl'>Products</Center>
      <Grid templateColumns='repeat(5, 1fr)' gap={8} marginTop='2rem'>
        {productos.map(ps=>{ return (
          <Card key={ps.id} producto={ps}></Card>
        )})}
      </Grid>
    </Box>
      
    )
  }