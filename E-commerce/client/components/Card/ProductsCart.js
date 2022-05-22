import { Grid, Center, Box } from '@chakra-ui/react'
import Card from './Card';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Cards() {
  const productsCart = useSelector((state)=> state.shoppingCartReducer.itemsCart);

  return (
    <Box margin='3em'>
      <Center fontSize='4xl'>Products</Center>
      <Grid templateColumns='repeat(5, 1fr)' gap={8} marginTop='2rem'>
        {productsCart.map(ps=>{ return (
          <Card key={ps.id} producto={ps}></Card>
        )})}
      </Grid>
    </Box>
    )
  }