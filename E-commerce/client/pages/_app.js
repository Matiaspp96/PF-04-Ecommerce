// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import React from "react"
import { wrapper } from "../redux/store"
import { ChakraProvider } from '@chakra-ui/react'

const MyApp = ({ Component, pageProps}) => (
  <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
)


export default wrapper.withRedux(MyApp);

