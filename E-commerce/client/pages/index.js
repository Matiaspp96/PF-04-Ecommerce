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
import { getSession } from 'next-auth/react'


export default function Home() {
  const [user, setUser] = useState({});
  
  // const dispatch = useDispatch();
  
  useEffect( () => {
   
    (async()=>{
     
    
        const userResponse = await axios.get('http://localhost:3001/api/auth/data', { withCredentials: true });
        
        setUser(userResponse.data)
    
   
    })();
    
    
  },[]);
  /*----- Cart -----*/
console.log(user)
  return (   
    <Stack alignItems='center'>
      <Navbar />
      <Cards />
      <Footer />
    </Stack>
  )
}
