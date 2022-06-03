import { Badge, Box, Button, Flex, Icon, LightMode, Stack, Text } from '@chakra-ui/react'
import '@fontsource/apfel-grotezk'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import CatLB from './Img/Cat Hooded Sweater LightBlue.webp'
import CatB from './Img/Cat Hooded Sweater Black.webp'
import CatG from './Img/Cat Hooded Sweater Gray.webp'
import CatR from './Img/Cat Hooded Sweater Rojo.webp'


export default function Banner (){
    return (
        <Box marginBottom='5em'>
        <Flex justifyContent='center' h={{base:'fit-content', md:'5em', lg:'fit-content'}}
        as={motion.div} initial={{x: '-50%', opacity:0, scale: 0.5}}
        animate={{x: 0, opacity:1, scale: 1}} 
        marginTop={{base: '.5em', md:'1em', lg:'1em'}}
        marginBottom={{base: '5em', md:'5em', lg:'5em'}}
        >   
        <Box w={{base:'100%', md:'fit-content', lg:'fit-content'}}
             h={{base:'fit-content', md:'fit-content', lg:'fit-content'}}>
            <Image src={CatLB} width='250' height='360' />
        </Box>
        <Box w={{base:'100%', md:'fit-content', lg:'fit-content'}}
             h={{base:'fit-content', md:'fit-content', lg:'fit-content'}}>
            <Image src={CatB}  width='250' height='360'/>
        </Box>
        <Box w={{base:'0', md:'fit-content', lg:'fit-content'}}>
            <Image src={CatG}  width='250' height='360' />
        </Box>
        <Box w={{base:'0', md:'fit-content', lg:'fit-content'}}>
            <Image src={CatR}  width='250' height='360'/>
        </Box>
            <Box pos='absolute' textAlign='center' top='90%' w='75vw' h='100px' transform={'skew(-20deg)'} 
            backgroundColor='blue.700'>
                <Text fontFamily='Apfel Grotezk' color='whiteAlpha.800'
                 fontSize={{base: '3xl', md:'4xl', lg:'6xl'}} >PRESUME TU PELUDO CON ESTILO</Text>
            </Box>
        </Flex>
        </Box>
    )
  }