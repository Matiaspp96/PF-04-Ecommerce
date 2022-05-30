import { useRouter } from 'next/router'
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react'
import { getDetail, getAllProducts } from '../../redux/actions/products.js'
import { Box, Divider, NumberInputField, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Tag, IconButton, Container, Stack, Flex, Text, Image, Button, Heading, SimpleGrid, Progress, Center, useBoolean, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { IoHeartSharp, IoStarSharp } from 'react-icons/io5'
import { addItemToCart, getTotalItems } from '../../redux/actions/cart.js';
import { addItemToFav, deleteItemOfFav } from '../../redux/actions/favorites.js';
import Review from '../Review/Review.js';
import CardMinimal from '../Card/CardMinimal.js';
import { handleAddToCartOrFav } from '../../utils/handles';


  export default function Detail() {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const [flag, setFlag] = useBoolean();

    useEffect(() => {
      dispatch(getDetail(id))
    },[dispatch,id]);

    const product = useSelector((state)=> state.productReducer.details);
    const sugestions = useSelector((state)=>state.productReducer.products).filter((ps)=>{return ps.category === product.category}).slice(0,5)

    useEffect(() => {
      if (!sugestions.length){
        dispatch(getAllProducts())
      }
    },[dispatch, sugestions.length]);

    function buyItem(e){
      dispatch(addItemToCart(handleAddToCartOrFav(e,product)))
      dispatch(getTotalItems())
      router.push('/cart')
    }
    
    const handleClickFav = ()=>{
      if(!flag){
        dispatch(addItemToFav(product))
        setFlag.on()
      } else {
        console.log(Number(id))
        dispatch(deleteItemOfFav(Number(id)))
        setFlag.off()
      }
    }

    return (
      <Container maxW={'7xl'} 
      >
        {product.name
        ?
        <> 
          <SimpleGrid 
            
            me={{base:'1rem', md:'3rem', lg:'5rem'}}
            ml={{base:'1rem', md:'3rem', lg:'5rem'}}
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 10, md: 10}}
            p={{base:3, md:5, lg:7}}>
        
            <Flex alignItems={'center'}>
                <Image
                  rounded={'md'}
                  alt={product.name}
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
                  {product.name}
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
                      {product.rating}
                  </Text>
                  <IoStarSharp size='1.5em' />
                </Flex>
              </Flex>
              <Flex alignItems={'center'}>
                <IconButton 
                  onClick={handleClickFav} 
                  bg={'transparent'}
                  icon={<IoHeartSharp size='2em' color={flag ? '#1884BE' : 'grey'}/>}/>
                <Text fontStyle={'italic'}>Add to Favorites</Text>
              </Flex>
              <Flex>
                <Text fontWeight={'bold'} me={'.3rem'}>Availability:</Text>
                <Text>{product.stock} In Stock</Text>
              </Flex>          
              <Flex alignItems={'end'} justifyContent={'space-around'}>
                {/* <Stack>
                  <Text>Quantity:</Text>
                  <NumberInput size='lg' maxW={20} defaultValue={1} min={1} max={product.stock}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Stack> */}
                <Button
                  fontSize={{base: '.8rem', lg:'1rem'}}
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

          <Divider />
          
          <SimpleGrid
          h={{base:'auto', lg:'25rem'}}
            me={{base:'1rem', md:'3rem', lg:'5rem'}}
            ml={{base:'1rem', md:'3rem', lg:'5rem'}}
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            p={{base:3, md:5, lg:7}}
            
          >

              <Container>
              <Tabs variant='enclosed'>
                <TabList  >
                  <Tab>Description</Tab>
                  <Tab>Reviews</Tab>
                </TabList>
                <TabPanels >
                  <TabPanel >
                    <Flex  h={{base: 'fit-content'}} alignItems={'center'} overflow={'auto'}>
                    <Box >
                      <Text
                        padding='2' fontSize={'larger'} >
                        {product.description}
                      </Text>
                    </Box>
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Review />
                  </TabPanel>
                </TabPanels>
              </Tabs>
              </Container>
              <Container
              overflow={{base:'visible', lg:'auto' }}>
                <Center fontSize='3xl' fontWeight={'bold'}>You may also like</Center>
                {sugestions.map(ps=>{ return (
                          <CardMinimal key={ps._id} producto={ps} />
                        )})}
              </Container>
          </SimpleGrid>
        </>
        :
        <Center h={'100vh'}>
          <Stack>
            <Heading>Just a moment</Heading>
            <Progress size='md' isIndeterminate />
          </Stack>
        </Center>
        
        }
      </Container>
    );
  }