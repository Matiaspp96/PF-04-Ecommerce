import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import Cards from '../components/Card/Cards.js'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer.js'
import { getAllProducts } from '../redux/actions/products.js'
import { useDispatch, useSelector } from 'react-redux';
import { Stack,Flex,Text,Select  } from '@chakra-ui/react'
import { addItemToCart } from '../redux/actions/cart.js'
import { getSession } from 'next-auth/react';
import { getUserData } from '../redux/actions/user.js'

// LOGICA PARA RECUPERAR DATOS DESDE EL LOCAL STORAGE CUANDO SE VUELVA ABRIR.
// Y SETEAR NUEVAMENTE EL ESTADO DE REDUX CON LOS DATOS DEL USER
// const userActive = useSelector(state => state.userReducer.user);
//   const [userId,setUser] = useState('')
//     useEffect(()=>{
//       let localUser = {};
//       if(localStorage){
//          localUser = JSON.parse(localStorage.getItem('userInfo'));
//       }
//          console.log(localUser)
//       if(Object.keys(userActive).length === 0 && Object.keys(localUser).length !== 0){
//          setUser(localUser._id)
         
//       }
      
//     },[]);
//     useEffect(()=>{
//     (async()=>{
//       if(userId){
//         const userData = await axios.get(`http://localhost:3001/api/users/${userId}`);
//         console.log(userData)
//         useDispatch(getUserData(userData.data.data))
//       }
      
//     })()
   
//     },[])
export default function Home() {
 
  /*----- Cart -----*/
 //console.log(localStorage.getItem('userInfo')||'')
  return (   
    <Stack alignItems='center'>
      <Navbar />
      <Cards />
      <Footer />
    </Stack>
  )
}
