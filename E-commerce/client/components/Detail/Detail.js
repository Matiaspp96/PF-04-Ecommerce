import { useRouter } from 'next/router'
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react'
import { getDetail } from '../../redux/actions/products.js'
import { Box, IconButton, Container, Stack, Flex, Text, Image, VStack, Button, Heading, SimpleGrid, Center, useBoolean } from '@chakra-ui/react';
import { IoHeartSharp, IoStarSharp } from 'react-icons/io5'
import { addItemToCart } from '../../redux/actions/cart.js';
import { addItemToFav } from '../../redux/actions/favorites.js';

  export default function Detail() {
    const router = useRouter()
    const { id } = router.query
    const dispatch = useDispatch();
    const [flag, setFlag] = useBoolean()

    useEffect(() => {
      dispatch(getDetail(id))
    },[dispatch,id]);

    const product = useSelector((state)=> state.productReducer.details);
    
    function buyItem(){
      dispatch(addItemToCart(product))
    }
    function loveItem(){
      dispatch(addItemToFav(product))
      setFlag.toggle()
    }

    return (
      <Container maxW={'7xl'}>
        {product.title ? 
        <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 10 }}>
      
        <Flex>
            <Image
              rounded={'md'}
              alt={product.title}
              src={product.image}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
            <IconButton 
            onClick={loveItem} 
            bg={'transparent'}
            icon={<IoHeartSharp size='3em' color={flag ? 'blue' : 'grey'}/>}/>
        </Flex>
        
          
          
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box>
            <Text>{product.category}</Text>
              <Heading
                lineHeight={1.1}
                fontWeight={550}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
                >
                {product.title}
              </Heading>
              
            
            <Text
              fontWeight={300}
              fontSize={'2xl'}>
              $ {product.price}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                fontSize={'2xl'}
                fontWeight={'300'}>
                {product.description}
              </Text>
              <Flex alignItems={'center'}>
              <Text
                fontWeight={300}
                fontSize={'2xl'}
                me={'.5em'}>
                {product.rating.rate}
              </Text>
              <IoStarSharp size='1.5em' />
              </Flex>
              
              
            </VStack>
          </Stack>

          <Button
            onClick={buyItem}
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            colorScheme='blue'
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