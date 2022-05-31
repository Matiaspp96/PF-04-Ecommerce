// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import React from "react"
import { wrapper } from "../redux/store"
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Head from "next/head"

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const MyApp = ({ Component, pageProps}) => (
  <ChakraProvider theme={theme}>
    <Head>
        <title>Pet Elegant - Ecommerce</title>
        <meta name='Pet Elegant Marketplace' content='This is a description'/>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </ChakraProvider>
)


export default wrapper.withRedux(MyApp);

