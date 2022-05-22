import { Grid, Center, Box } from '@chakra-ui/react'
import Card from './Card';
import { useSelector } from 'react-redux';

export default function Cards() {
  const productsFavs = useSelector((state)=> state.favoritesReducer.itemsFav);

  return (
    <Box margin='3em'>
      <Center fontSize='4xl'>Favorites</Center>
      <Grid templateColumns='repeat(5, 1fr)' gap={8} marginTop='2rem'>
        {productsFavs.map(ps=>{ return (
          <Card key={ps.id} producto={ps}></Card>
        )})}
      </Grid>
    </Box>
    )
  }