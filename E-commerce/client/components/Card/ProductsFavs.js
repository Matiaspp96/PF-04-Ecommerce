import { Grid, Center, Box, SimpleGrid, Text, Button, Flex } from '@chakra-ui/react'
import Card from './Card';
import { AiOutlineHeart, AiOutlineLike, AiOutlineOrderedList } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Link from 'next/link';

export default function Cards() {
  const productsFavs = useSelector((state)=> state.favoritesReducer.itemsFav);

  return (
    <Box w='95vw'>
      <Text><Link href='/'>Home </Link>/ Favorites</Text>
      {productsFavs.length < 1 ? 
      <Flex flexDir='column' justifyContent='center' alignItems='center' textAlign='center' h={['90vh']}>
        <AiOutlineHeart size='150'/>
        <Text fontSize='2em'>Your whish list is empty</Text>
        <Link href="/"><Button pos='relative' color='blackAlpha.800' borderRadius='15px' p='1em' mt='1em'>Continue Shopping</Button></Link>
      </Flex> :
      <Grid 
        margin={{base: '.5em', md:'1em 0em', lg:'2em 0em'}} height='auto'
        >
        <Grid templateColumns={{ base: '1fr', sm: '1fr', md:'repeat(4, 1fr)', lg:'repeat(4, 1fr)' }}
        gap={5} >
        {
          productsFavs?.map(ps=>{ return (
            <Card key={ps._id} producto={ps} ></Card>
            )})
          }
        </Grid>
      </Grid>
      }
    </Box>
    )
  }