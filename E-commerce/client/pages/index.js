import Head from 'next/head'
import Image from 'next/image'
import Cards from '../components/Card/Cards.js'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer.js'
import { useEffect, useState } from 'react'
import { getAllProducts } from '../redux/actions/products.js'
import { useDispatch, useSelector } from 'react-redux';
import { Stack,Flex,Text,Select  } from '@chakra-ui/react'
import { addItemToCart } from '../redux/actions/cart.js'



export default function Home() {
  // const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(getAllProducts())
  // },[dispatch]);

  /*----- Cart -----*/

  return (   
    <Stack alignItems='center'>
      <Navbar />
      <Cards />
      <Footer />
    </Stack>
  )
}
