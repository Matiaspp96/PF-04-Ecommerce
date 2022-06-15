
import { 
  SimpleGrid, 
  Center, Flex, 
  Heading, 
  Stack, 
  Progress,
  IconButton, 
} from '@chakra-ui/react'
import Card from './Card';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../redux/actions/products';
import Sort from '../Sort/Sort'
import PaginationDisplayer from '../Pagination/PaginationDisplayer';
import { IoReloadOutline } from "react-icons/io5";


export default function Cards() {
  const elements = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("");
  const [, setOrderPrice] = useState("");
  const [, setOrderName] = useState("");
  

  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);

  const getPaginatedProducts = () => {
    const idxEnd = currentPage * elements;
    const idxStart = idxEnd - elements;
      return products.slice(idxStart, idxEnd);
   };

  const reload = () => {
    dispatch(getAllProducts());
    setCurrentPage(1)
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Flex justifyContent={"space-between"}>
      <Stack w={"100%"}>
        {products.length ? (
          <Stack alignItems='center'>
            <Sort
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setOrderPrice={setOrderPrice}
              setOrderName={setOrderName}
            />
             <Flex
              justifyContent="center" 
              alignItems={"center"}
              gap="1.5em"
              flexDir={{ base: "column", lg: "row" }}
              whiteSpace="nowrap"
              w={{base: '95%', md:'80%', lg:'80%'}}
              mt={{base: '.5em', md:'1em', lg:'1em'}}
              ml={{base: '.5em'}}
              mr={{base: '.5em'}}
              minW='100%' 
              maxW='100%'
            >
              <IconButton icon={<IoReloadOutline />} onClick={reload} me={'1rem'} />
            </Flex>
            <SimpleGrid
                maxW='95vw'
                minW='95vw'
                columns={{ base: 2, sm: 3, md: 4, lg:5, xl:5 }}
                gap={{base:'2',md:'5'}} 
                marginTop='2rem'>
                  {getPaginatedProducts().map(ps=>{ return (
                    <Card key={ps._id} producto={ps}></Card>
                  )})}
            </SimpleGrid>
            <PaginationDisplayer
              products={products}
              elements={elements}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              Component={SimpleGrid}
            />
          </Stack>
        ) : (
          <Center h={"100vh"}>
            <Stack>
              <Heading>Just a moment</Heading>
              <Progress size="md" isIndeterminate />
            </Stack>
          </Center>
        )}
      </Stack>
    </Flex>
  );
};
