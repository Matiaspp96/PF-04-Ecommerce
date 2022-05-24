
import { SimpleGrid, Center, Flex, Box, Heading, Stack, Progress, Button } from '@chakra-ui/react'
import Card from './Card';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Cards() {
  const elements = 10;
  const [currentPage,setCurrentPage] = useState(1)
  const productos = useSelector((state)=> state.productReducer.products);
  
  const pages = Math.ceil(productos.length/elements);
  
  const buttons = [];
    for(let i=1; i<=pages; i++){
        buttons.push(i)
    }
  
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
        <Flex justifyContent={'center'}>
          <Button
            me={'1em'} 
            onClick={prevClick} 
            leftIcon={<FaChevronLeft/>} 
            colorScheme='blue' 
            variant='solid'
            isDisabled={currentPage === 1 ? true : false}>
          </Button>
          
          {buttons.map(btn=> <Button me={'1em'} onClick={handleClick}>{btn}</Button>)}
          
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
              <Card key={ps.id} producto={ps}></Card>
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