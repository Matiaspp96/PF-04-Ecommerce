
import { Grid, Center, Box } from '@chakra-ui/react'
import Card from './Card';

export default function Cards({ productos }) {
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