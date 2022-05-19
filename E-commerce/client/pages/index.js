import Head from 'next/head'
import Image from 'next/image'
import Cards from '../components/Card/Cards.js'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import { useEffect } from 'react'
import { getAllProducts } from '../redux/actions/products.js'
import { useDispatch } from 'react-redux';



export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  },[dispatch]);

  return (   
    <div>
      <Navbar/>
      <Cards />
    </div>
  )
}

// Home.getInitialProps = async (ctx) => {
//   const res = await axios.get('https://fakestoreapi.com/products')
//   const producto = res.data;
//   return {
//     msg: producto
//   }
// }
