import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import Cards from '../components/Card/Cards.js'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer.js'
import { useDispatch, useSelector } from 'react-redux';
import { Stack,Flex,Text,Select  } from '@chakra-ui/react'
import Banner from '../components/Banner/Banner'
import ProductsTop from '../components/Card/ProductsTop'
import Map from '../components/Maps/Map'



export default function Home() {
 
  /*----- Cart -----*/
 //console.log(localStorage.getItem('userInfo')||'')

  const [user, setUser] = useState({});

  const dispatch = useDispatch();
  const ReducerUser = useSelector((state) => state.userReducer.user);


  // useEffect(() => {
  //   dispatch(getUserData(user));
  // }, [dispatch, user]);

  /*----- Cart -----*/

  return (
    <Flex flexDir="column" alignItems="center">
      <Navbar />
      <Banner />
      <ProductsTop />
      <Cards />
      <Map />
      <Footer />
    </Flex>
  );
}
