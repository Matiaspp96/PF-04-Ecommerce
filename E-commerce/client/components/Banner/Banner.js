import { Badge, Box, Button, Flex, Icon, LightMode, Stack, Text, useColorMode } from '@chakra-ui/react'
import '@fontsource/apfel-grotezk'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import React, { useRef, useEffect, useState } from 'react'
import BannerPets from './BannerPets'


export default function Banner (){
    const { colorMode } = useColorMode();

    return (
        <Flex justifyContent='center'
        flexDir='column'
        alignItems='center'
        w={{base: '95%', md:'80%', lg:'80%'}}
        mt={{base: '.5em', md:'1em', lg:'1em'}}
        ml={{base: '.5em'}}
        mr={{base: '.5em'}}
        >
            <Flex justifyContent='center'
            pos='relative'
            bgGradient='linear-gradient(to-b, #348099 60%, #51ACAD 100%)'
            w='100%'
            as={motion.div} initial={{x: '-50%', opacity:0, scale: 0.5}}
            animate={{x: 0, opacity:1, scale: 1}} 
            overflow='hidden'
            borderRadius='20px'
            boxShadow={colorMode === 'light' ? '5px 10px 8px #888888' : 'none'}
            // _before={{content:`''`, opacity:0.5, background:'linear-gradient(to-r, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 50%,rgba(255,255,255,1) 100% )'}}
            // _after={{content:`''`, opacity:0.5, background:'linear-gradient(to-r, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 50%,rgba(255,255,255,1) 100% )'}}
            >   
                <BannerPets  />
            </Flex>
            <Box position='relative' top='-40px' textAlign='center' w='75vw' h={{base: 'fit-content' , md:'5.5rem'}} transform={'skew(-20deg)'} 
            boxShadow={colorMode === 'light' ? '5px 10px 8px #888888' : 'none'}
            bgColor='#51ACAD' borderRadius='15px'>
                <Text fontFamily='Apfel Grotezk' color='whiteAlpha.700' fontSize={{base: '3xl', md:'4xl', lg:'6xl'}} >PRESUME TU PELUDO CON ESTILO</Text>
            </Box>
        </Flex>
    )
  }