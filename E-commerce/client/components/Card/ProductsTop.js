import { Grid, Center, Box, SimpleGrid, keyframes, Text, Button, Flex, Skeleton, VStack, Icon, Heading, useColorMode } from '@chakra-ui/react'
import Card from './Card';
import { AiOutlineHeart, AiOutlineLike, AiOutlineOrderedList } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getAllProducts, getProductsTop } from '../../redux/actions/products';
import { IoArrowRedoOutline, IoArrowUndoOutline } from 'react-icons/io5';
import { BsHandIndexThumb, BsMouse } from 'react-icons/bs';

export default function Cards() {
    const products = useSelector((state) => state.productReducer.productsTop);
    const [top, setTop] = useState([]);
    const dispatch = useDispatch()
    const carousel = useRef()
    const [width,setWidth]= useState(0)
    const [posX, setPosX] = useState(0)
    const [isActive,setIsActive]= useState(false)
    const [isLoading,setIsLoading]= useState(false)
    const { colorMode } = useColorMode();


    useEffect(() => {
      dispatch(getAllProducts());
    }, [dispatch]);
    
    useEffect(()=>{
      async function getProducts (){
        if(products.length > 1){
          setTop(products)
        }
        // if(top.length > 1){
        //   setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
        // }
        setIsLoading(true) 
        }
        getProducts()
    })

    useEffect(()=>{
      // setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth + 470)
      setWidth(2220)
  })


    const scroll = keyframes`
    0% { transform: translateX(-${posX}); }
    100% { transform: translateX(calc(-250px * 5)) }
    `;
    const mixin = `
    white-gradient { background: linear-gradient(to right,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);}
    ` 

    function handleActive(e){
        e.preventDefault();
        setIsActive(true)
    }

    function handleInactive(e, x){
        e.preventDefault();
        setPosX(x)
        setTimeout(()=>{
          setIsActive(false)
      }, 5000)
    }

  return (
      <VStack>
      <Center>
      <Heading fontSize='2em' >Products Highlights</Heading>
      </Center>
      {top.length < 1 ? 
      <Flex flexDir='column' justifyContent='center' alignItems='center' textAlign='center' h={['90vh']}
      ref={carousel}
      >
        <Skeleton h={{base:'270', md:'290', lg:'365'}} w={{base:'full', md:'fit-content', lg:'full'}} ><div></div></Skeleton>
      </Flex> :
      <Skeleton isLoaded={top.length > 1} w='95vw'>
      <Flex justifyContent='center'
      pos='relative'
      flexDir='column'
      bgColor='#aadae3'
      bgGradient={colorMode === 'light' ? 'linear-gradient(to-t, #b2e1e3 40%, #51ACAD 170%)' : 'linear-gradient(to-t, #02192e 40%, #51ACAD 170%)'}
      w='100%'
      as={motion.div} initial={{x: '-30%', opacity:0, scale: 0.5}}
      animate={{x: 0, opacity:1, scale: 1}} 
      overflow='hidden'
      borderRadius='20px'
      boxShadow={colorMode === 'light' ? '5px 10px 8px #888888' : 'none'}
      // _before={{content:`''`, opacity:0.5, background:'linear-gradient(to-r, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 50%,rgba(255,255,255,1) 100% )'}}
      // _after={{content:`''`, opacity:0.5, background:'linear-gradient(to-r, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 50%,rgba(255,255,255,1) 100% )'}}
      >
          <Grid display={{base: 'flex', md:'grid'}} templateColumns={{ base: '1fr 1fr', sm: '1fr 1fr', md:'repeat(12, 10%)', lg:'repeat(12, 18%)' }}
          h={{base:'fit-content', md:'fit-content', lg:'fit-content'}}
          as={motion.div}
          ref={carousel}
          drag='x' dragConstraints={{
              right: 0,
              left: -width
          }}
          onDragStart={e => handleActive(e)}
          onDragEnd={(e,info) => handleInactive(e, info.point.x)}
          // dragMomentum={false}
          animation={isActive ? `none` : `${scroll} 40s linear infinite`}
          w={{base:'full', md:'fit-content', lg:'full'}}
          mt={{base: '.5em', md:'1em', lg:'1em'}}
          mb={{base: '.5em', md:'1em', lg:'1em'}}
          ml={{base: '0.5em'}}
          mr={{base: '0.5em'}}
          cursor='grab'
          gap={{base: '1rem', md:'1rem', lg:'1rem'}}
          >
        {
          top?.map(ps=>{ return (
            <Box pos='relative' 
            zIndex='2' key={ps._id} minW='fit-content' minH='fit-content' overflow='hidden' pb='5rem'>
              <Card key={ps._id} producto={ps}></Card>
            </Box>
            )})
          }
        </Grid>
        <Center> 
          <Flex pos='relative' top='-20px' alignItems='flex-end' h='max-content' w='max-content'  color='blackAlpha.800'>
            <IoArrowUndoOutline size='1.5rem' color='blackAlpha.100'/>
            <BsHandIndexThumb size='1.5rem' color='blackAlpha.100'/>
            <IoArrowRedoOutline size='1.5rem'  color='blackAlpha.100'/>
          </Flex>
        </Center>
        </Flex>
        </Skeleton>
      }
    </VStack>
    )
  }