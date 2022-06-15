import { Grid, Center, Box, SimpleGrid, Text, Button, Flex, Stack, Heading, Progress } from '@chakra-ui/react'
import Card from './Card';
import { AiOutlineHeart, AiOutlineLike, AiOutlineOrderedList } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getItemsFav } from '../../redux/actions/favorites';

export default function Cards() {
  const productsFavs = useSelector((state)=> state.favoritesReducer.itemsFav);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState();
  const dispatch = useDispatch();

  useEffect(()=>{
    async function fetchData(){
    setFavorites(productsFavs)
    setIsLoading(false)
  }
    fetchData()
  }, [favorites, dispatch, isLoading])


  if(isLoading){
    return (
      <Center h={"100vh"}>
        <Stack>
          <Heading>Just a moment</Heading>
          <Progress size="md" isIndeterminate />
        </Stack>
      </Center>
    )
  }

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