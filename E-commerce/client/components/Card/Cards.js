
import { Select, Text, SimpleGrid, Center, Flex, Box, Heading, Stack, Progress, Button, } from '@chakra-ui/react'
import Card from './Card';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { orderProducts } from '../../redux/actions/products';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../redux/actions/products';
import {filterByCategory} from "../../redux/actions/categories"
import MenuToggle from '../Menu/MenuToggle'


export default function Cards() {
  const elements = 10;
  const [currentPage,setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const [sort,setSort] = useState('');
  let productos = useSelector((state)=> state.productReducer.products)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [, setCategories] = useState('')
  
  
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch]);
  
  
  const pages = Math.ceil(productos.length/elements);
  
  const buttons = [];
    for(let i=1; i<=pages; i++){
        buttons.push(i)
    }
  
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
    <Box minW='95vw' margin={{base: '.5em', md:'1em', lg:'0 1em'}}>
      {productos.length ? 
      <Stack alignItems='center'>
        <Flex justifyContent={{base:'center'}} mb={'1.2rem'} 
        h={{base:'8em', lg:'3em'}}
        gap='1.5em'
        flexDir={{base:'column', lg:'row'}} 
        whiteSpace='nowrap' >
          <Flex alignItems={'center'} gap='1.5em'>
            <Text fontWeight={'bold'}>Sort by:</Text>
            <Select placeholder='' onChange={handleSort}>
                <option value='MIN'>Lower price</option>
                <option value='MAX'>Higher price</option>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
            </Select>
          </Flex>
            {/* <Tag> Categories</Tag> */}
          <Flex alignItems={'center'} gap='1.5em' >
            <Text fontWeight={'bold'}>Categories:</Text>
            <Select
              placeholder=""
              onChange={handleFilterByCategories}
              >
                  <option value='All'>All</option>
                  <option value='doglovers'>doglovers</option>
                  <option value='catlovers'>catlovers</option>
                  <option value='coat'>coat</option>
                  <option value='T-SHIRT'>T-SHIRT</option>
                  <option value='Harness'>Harness</option>
            </Select>
          </Flex>
        {/* <MenuToggle toggle={toggle} isOpen={isOpen} /> */}
        </Flex>
        
        <Flex justifyContent={'center'} flexDir='row' flexWrap='wrap'>
          <Button
            me={'1em'} 
            onClick={prevClick} 
            leftIcon={<FaChevronLeft/>} 
            colorScheme='blue' 
            variant='solid'
            size='sm'
            isDisabled={currentPage === 1 ? true : false}>
          </Button>
          
          {buttons.map((btn,id) => <Button key={id} me={'1em'} size='sm' onClick={handleClick}>{btn}</Button>)}
          
          <Button 
            // me={{base:'0', xl:'1em'}}
            onClick={nextClick}
            rightIcon={<FaChevronRight />}
            colorScheme='blue'
            variant={'solid'}
            size='sm'
            isDisabled={currentPage === pages ? true : false}>  
          </Button>
        </Flex>
        
        <SimpleGrid
          maxW='95vw'
          minW='95vw'
          columns={{ base: 2, sm: 3, md: 4, lg:5, xl:5 }}
          gap={'5'} 
          marginTop='2rem'>
            {getPaginatedProducts().map(ps=>{ return (
              <Card key={ps._id} producto={ps}></Card>
            )})}
        </SimpleGrid>
      </Stack> :
      <Center h={'100vh'}>
        <Stack>
          <Heading>Just a moment</Heading>
          <Progress size='md' isIndeterminate />
        </Stack>
      </Center>}
    </Box>
    )
  }
