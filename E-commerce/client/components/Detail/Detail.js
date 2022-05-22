import { useRouter } from 'next/router'
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react'
import { getDetail } from '../../redux/actions/products.js'
import { Box,NumberInputField, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Tag, IconButton, Container, Stack, Flex, Text, Image, VStack, Button, Heading, SimpleGrid, Center, useBoolean, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { IoHeartSharp, IoStarSharp } from 'react-icons/io5'
import { addItemToCart } from '../../redux/actions/cart.js';
import { addItemToFav } from '../../redux/actions/favorites.js';
import Review from '../Review/Review.js'

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
        {product.title
        ?
        <> 
          <SimpleGrid 
            boxShadow='2xl'
            me={{base:'1rem', md:'3rem', lg:'5rem'}}
            ml={{base:'1rem', md:'3rem', lg:'5rem'}}
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 10, md: 10}}
            p={{base:3, md:5, lg:7}}>
        
            <Flex alignItems={'center'}>
                <Image
                  rounded={'md'}
                  alt={product.title}
                  src={product.image}
                  fit={'fill'}
                  align={'center'}
                  w={'100%'}
                  h={{ base: '100%', sm: '400px', lg: '500px' }}
                />
            </Flex>

            <Stack spacing={{ base: 6, md: 10 }}>
              <Tag
                borderRadius={'none'}
                alignSelf={'flex-start'}
                fontSize={'sm'}
                fontStyle={'italic'}>
                  {product.category}
              </Tag>
              <Heading
                lineHeight={1.1}
                fontWeight={550}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                  {product.title}
              </Heading>
              <Flex >
                <Text
                  fontWeight={'medium'}
                  fontSize={'2xl'}
                  color={'#1884BE'}>
                  $ {product.price}
                </Text>
                <Flex ml={'3rem'} alignItems={'center'}>
                  <Text
                    fontWeight={300}
                    fontSize={'2xl'}
                    me={'.5em'}>
                      {product.rating.rate}
                  </Text>
                  <IoStarSharp size='1.5em' />
                </Flex>
              </Flex>
              <Flex alignItems={'center'}>
                <IconButton 
                  onClick={loveItem} 
                  bg={'transparent'}
                  icon={<IoHeartSharp size='2em' color={flag ? '#1884BE' : 'grey'}/>}/>
                <Text fontStyle={'italic'}>Add to Favorites</Text>
              </Flex>
              <Flex>
                <Text fontWeight={'bold'} me={'.3rem'}>Availability:</Text>
                <Text>In Stock</Text>
              </Flex>          
              <Flex alignItems={'end'} justifyContent={'space-around'}>
                <Stack>
                  <Text>Quantity:</Text>
                  <NumberInput size='lg' maxW={20} defaultValue={1} min={1}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Stack>
                <Button
                  onClick={buyItem}
                  rounded={'none'}
                  w={'40%'}
                  size={'lg'}
                  py={'7'}
                  bgColor='#1884BE'
                  color={'white'}
                  _hover={{
                    transform: 'translateY(2px)',
                    boxShadow: 'lg',
                  }}>
                    ADD TO CART
                </Button>
              </Flex>
            </Stack>
          
          </SimpleGrid>
          <SimpleGrid
            me={{base:'1rem', md:'3rem', lg:'5rem'}}
            ml={{base:'1rem', md:'3rem', lg:'5rem'}}
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 10, md: 10}}
            p={{base:3, md:5, lg:7}}
            height={'100px'}>

              <Container boxShadow='2xl'>
              <Tabs variant='enclosed'>
                <TabList >
                  <Tab>Description</Tab>
                  <Tab>Reviews</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel >
                    <Flex h={'64'} alignItems={'center'}>
                    <Text
                      padding='2' fontSize={'larger'}>
                      {product.description}
                    </Text>
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Review />
                  </TabPanel>
                </TabPanels>
              </Tabs>
              </Container>
              

            

          </SimpleGrid>
        </>
        :
        <Center>
          <Text>Loading...</Text>
        </Center>}
      </Container>
    );
  }