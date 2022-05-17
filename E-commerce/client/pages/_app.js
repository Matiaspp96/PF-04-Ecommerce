// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import React from "react"
import { wrapper } from "../redux/store"

const MyApp = ({ Component, pageProps}) => (
  <Component {...pageProps} />
)

export default wrapper.withRedux(MyApp);