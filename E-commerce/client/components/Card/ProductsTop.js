import { Grid, Center, Box, SimpleGrid, keyframes, Text, Button, Flex, Skeleton, VStack, Icon, Heading } from '@chakra-ui/react'
import Card from './Card';
import { AiOutlineHeart, AiOutlineLike, AiOutlineOrderedList } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getAllProducts, getProductsTop } from '../../redux/actions/products';
import { BiBone } from 'react-icons/bi';
import { FaCat, FaDog } from 'react-icons/fa';

export default function Cards() {
    const products = useSelector((state) => state.productReducer.productsTop);
    const [top, setTop] = useState([]);
    const dispatch = useDispatch()
    const carousel = useRef()
    const [width,setWidth]= useState(0)
    const [posX, setPosX] = useState(0)
    const [isActive,setIsActive]= useState(false)
    const [isLoading,setIsLoading]= useState(false)

    console.log(top)
    
    useEffect(()=>{
      async function getProducts (){
        await dispatch(getAllProducts())
        await dispatch(getProductsTop())
        setTop(products)
        if(top.length > 1){
          setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
          console.log(width)
        }
        setIsLoading(true) 
          }
         getProducts()
    }, [dispatch,isLoading])

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
      <Flex flexDir='column' justifyContent='center' alignItems='center' textAlign='center' h={['90vh']}>
        <Skeleton h={{base:'270', md:'290', lg:'365'}} w={{base:'full', md:'fit-content', lg:'full'}} ><div></div></Skeleton>
      </Flex> :
      <Skeleton isLoaded={top.length > 1} w='95vw'>
      <Flex justifyContent='center'
      pos='relative'
      bgColor='blackAlpha.200'
      w='100%'
      as={motion.div} initial={{x: '-50%', opacity:0, scale: 0.5}}
      animate={{x: 0, opacity:1, scale: 1}} 
      overflow='hidden'
      borderRadius='20px'
      boxShadow='lg'
      // _before={{content:`''`, opacity:0.5, background:'linear-gradient(to-r, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 50%,rgba(255,255,255,1) 100% )'}}
      // _after={{content:`''`, opacity:0.5, background:'linear-gradient(to-r, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 50%,rgba(255,255,255,1) 100% )'}}
      >
          <Flex  h={{base:'fit-content', md:'5em', lg:'fit-content'}}
          as={motion.div}
          ref={carousel}
          drag='x' dragConstraints={{
              right: 0,
              left: -width
          }}
          onDragStart={e => handleActive(e)}
          onDragEnd={(e,info) => handleInactive(e,info.point.x)}
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
            zIndex='0' key={ps._id} as={motion.div} minW='fit-content' minH='fit-content' overflow='hidden'>
              <Card key={ps._id} producto={ps}></Card>
            </Box>
            )})
          }
        </Flex>
        </Flex>
        </Skeleton>
      }
    </VStack>
    )
  }