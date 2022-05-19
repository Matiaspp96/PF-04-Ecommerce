import Head from 'next/head'
import Image from 'next/image'
import Cards from '../components/Card/Cards.js'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import { useEffect } from 'react'
import { getAllProducts } from '../redux/actions/products.js'
import { useDispatch } from 'react-redux';
import { Grid } from '@chakra-ui/react'



export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  },[dispatch]);

  return (   
    <Grid row={2}>
      <Navbar />
      <Cards />
    </Grid>
  )
}
