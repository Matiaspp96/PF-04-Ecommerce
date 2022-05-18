import Head from 'next/head'
import Image from 'next/image'
import Cards from '../components/Card/Cards.js'
import axios from 'axios'


export default function Home({msg}) {
  return (
    <div> 
      <Cards productos={msg}/>
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const res = await axios.get('https://fakestoreapi.com/products')
  const producto = res.data;
  return {
    msg: producto
  }
}