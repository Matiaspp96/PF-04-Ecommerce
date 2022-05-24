import Head from 'next/head'
import Image from 'next/image'
import Cards from '../components/Card/Cards.js'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer.js'
import { useEffect } from 'react'
import { getAllProducts } from '../redux/actions/products.js'
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@chakra-ui/react'
import { addItemToCart } from '../redux/actions/cart.js'



export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  },[dispatch]);

  /*----- Cart -----*/

  return (   
    <Grid row={2}>
      <Navbar />
      <Cards />
      <Footer />
    </Grid>
  )
}
