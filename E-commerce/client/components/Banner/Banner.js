import { Badge, Box, Button, Flex, Icon, LightMode, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

export default function Banner (){
    return (
        <Flex flexDir='row' h='80vh' w='100vw'>
            <Image src='./Img/Cat Hooded Sweater LightBlue.webp' layout='responsive' width='20em' height='40em'/>
            <Image src='./Img/Cat Hooded Sweater Rojo.webp' layout='responsive' width='20em' height='40em'/>
            <Image src='./Img/Cat Hooded Sweater Black.webp' layout='responsive' width='20em' height='40em'/>
            <Image src='./Img/Cat Hooded Sweater Gray.webp' layout='responsive' width='20em' height='40em'/>
        </Flex>
    )
  }