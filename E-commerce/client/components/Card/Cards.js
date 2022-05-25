
<<<<<<< HEAD
import { Select, Text, SimpleGrid, Center, Flex, Box, Heading, Stack, Progress, Button, } from '@chakra-ui/react'
=======
import { Select, Text, SimpleGrid, Center, Flex, Box, Heading, Stack, Progress, Button } from '@chakra-ui/react'
>>>>>>> fa3310e8c63e5c29af68d002cdfae8a5a944d02d
import Card from './Card';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { orderProducts } from '../../redux/actions/products';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../redux/actions/products';
<<<<<<< HEAD
import {filterByCategory} from "../../redux/actions/categories"
=======
>>>>>>> fa3310e8c63e5c29af68d002cdfae8a5a944d02d


export default function Cards() {
  const elements = 10;
  const [currentPage,setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const [sort,setSort] = useState('');
  let productos = useSelector((state)=> state.productReducer.products)
<<<<<<< HEAD

  const [, setCategories] = useState('')
  const totalCategories = useSelector((state) => state.productReducer.products);
  
=======
>>>>>>> fa3310e8c63e5c29af68d002cdfae8a5a944d02d
  
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch]);
<<<<<<< HEAD
  
=======

>>>>>>> fa3310e8c63e5c29af68d002cdfae8a5a944d02d
  
  const pages = Math.ceil(productos.length/elements);
  
  const buttons = [];
    for(let i=1; i<=pages; i++){
        buttons.push(i)
    }
    
  const handleSort= (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setSort(e.target.value)
    dispatch(orderProducts(e.target.value))
  };
  
  const handleFilterByCategories = (e) => {
    e.preventDefault();
    dispatch(filterByCategory(e.target.value));
    setCategories(e.target.value);
  }
    
  const handleSort= (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setSort(e.target.value)
    dispatch(orderProducts(e.target.value))
  };
  
  const getPaginatedProducts = () => {
    const idxEnd = currentPage * elements;
    const idxStart = idxEnd - elements;
      return productos.slice(idxStart, idxEnd);
   };

  function handleClick(e){
    let page = parseInt(e.target.innerText);
    setCurrentPage(page)
  }

  function prevClick(){
    let page = currentPage;
    if(page === 1){
      return;
    } else {
      setCurrentPage(page-1) 
    } 
  }

  function nextClick(){
    let page = currentPage;
    if(page === pages){
      return
    } else {
      setCurrentPage(page+1) 
    }
  }


  return (
    <Box margin={{base: '.5em', md:'1em', lg:'3em'}}>
      {productos.length ? 
      <Box>
        <Flex justifyContent={{base:'center', lg:'flex-start'}} ml={{base:0, lg:'1rem'}}>
          <Flex alignItems={'center'} mb={'1.2rem'}  > 
              <Text fontWeight={'bold'} me={'1rem'} >Sort by:</Text>
<<<<<<< HEAD
              <Flex>
=======
              <Stack>
>>>>>>> fa3310e8c63e5c29af68d002cdfae8a5a944d02d
                  <Select variant='flushed' placeholder='' onChange={handleSort}>
                      <option value='MIN'>Lower price</option>
                      <option value='MAX'>Higher price</option>
                      <option value='A-Z'>A-Z</option>
                      <option value='Z-A'>Z-A</option>
                  </Select>
<<<<<<< HEAD
                  {/* <Tag> Categories</Tag> */}
                  <Text fontWeight={'bold'} me={'1rem'} >Categories:</Text>
                  <Select
                    placeholder=""
                    onChange={handleFilterByCategories}
                    >
                        <option value='All'>All</option>
                        <option value='Doglovers'>Doglovers</option>
                        <option value='catlovers'>catlovers</option>

                </Select>
              </Flex>
=======
              </Stack>
>>>>>>> fa3310e8c63e5c29af68d002cdfae8a5a944d02d
          </Flex>
        </Flex>
        
        <Flex justifyContent={'center'}>
          <Button
            me={'1em'} 
            onClick={prevClick} 
            leftIcon={<FaChevronLeft/>} 
            colorScheme='blue' 
            variant='solid'
            isDisabled={currentPage === 1 ? true : false}>
          </Button>
          
          {buttons.map((btn,id) => <Button key={id} me={'1em'} onClick={handleClick}>{btn}</Button>)}
          
          <Button 
            // me={{base:'0', xl:'1em'}}
            onClick={nextClick}
            rightIcon={<FaChevronRight />}
            colorScheme='blue'
            variant={'solid'}
            isDisabled={currentPage === pages ? true : false}>  
          </Button>
        </Flex>
        
        <SimpleGrid
          columns={{ base: 2, sm: 3, md: 4, lg:5 }}
          gap={'5'} 
          marginTop='2rem'>
            {getPaginatedProducts().map(ps=>{ return (
              <Card key={ps._id} producto={ps}></Card>
            )})}
        </SimpleGrid>
      </Box> :
      <Center h={'100vh'}>
        <Stack>
          <Heading>Just a moment</Heading>
          <Progress size='md' isIndeterminate />
        </Stack>
      </Center>}
    </Box>
    )
  }
