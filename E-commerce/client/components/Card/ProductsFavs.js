import { Grid, Center, Box, SimpleGrid } from '@chakra-ui/react'
import Card from './Card';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Cards() {
  const productsFavs = useSelector((state)=> state.favoritesReducer.itemsFav);

  return (
    <Box margin={{base: '.5em', md:'1em', lg:'2em'}}>
      <Center fontSize='4xl'>Favorites</Center>
      <SimpleGrid
              columns={{ base: 2, sm: 3, md: 4, lg:5 }}
              gap={'5'} 
              marginTop='2rem'>
        {productsFavs.map(ps=>{ return (
          <Card key={ps.id} producto={ps}></Card>
        )})}
      </SimpleGrid>
    </Box>
    )
  }