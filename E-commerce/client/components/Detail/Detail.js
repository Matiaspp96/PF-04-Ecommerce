import { useRouter } from 'next/router'
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react'
import { getDetail } from '../../redux/actions/products.js'
import { Box, Container, Stack, Text, Image, VStack, Button, Heading, SimpleGrid, useColorModeValue, Center } from '@chakra-ui/react';
  
  export default function Detail() {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getDetail(id))
    },[dispatch,id]);

    const product = useSelector((state)=> state.productReducer.details);
    
    return (
      <Container maxW={'7xl'}>
        {product.title ? 
        <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 10 }}>
        
          <Image
            rounded={'md'}
            alt={product.title}
            src={product.image}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box>
            <Text>{product.category}</Text>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {product.title}
            </Heading>
            <Text
              fontWeight={300}
              fontSize={'2xl'}>
              {product.price}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}>
                {product.description}
              </Text>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}>
                {product.rating.rate}
              </Text>    
            </VStack>
          </Stack>

          <Button
            rounded={'none'}
            zIndex={'-1'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
            Add to cart
          </Button>
        </Stack>
      </SimpleGrid>:
      <Center><Text>Loading...</Text></Center>}
      </Container>
    );
  }