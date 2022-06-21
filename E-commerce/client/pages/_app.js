// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import React from "react"
import { wrapper } from "../redux/store"
import { ChakraProvider, SlideFade } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Head from "next/head"
import { myNewTheme } from "../utils/theme"
import { useRouter } from "next/router"


const MyApp = ({ Component, pageProps}) => (
  <ChakraProvider theme={myNewTheme}>
    <Head>
        <title>Pet Elegant - Ecommerce</title>
        <meta name='Pet Elegant Marketplace' content='This is a description'/>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <SlideFade key={Math.random()} in="true">
    <Component {...pageProps} />
    </SlideFade>
  </ChakraProvider>
)


export default wrapper.withRedux(MyApp);

