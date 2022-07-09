import { wrapper } from '../redux/store';
import { ChakraProvider, SlideFade } from '@chakra-ui/react';
import Head from 'next/head';
import { myNewTheme } from '../utils/theme';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    infuraProvider({ infuraId: process.env.INFURA_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'Pet Elegant',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const MyApp = ({ Component, pageProps }) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <ChakraProvider theme={myNewTheme}>
        <Head>
          <title>Pet Elegant - Ecommerce</title>
          <meta name='Pet Elegant Marketplace' content='This is a description' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <SlideFade key={Math.random()} in='true'>
          <Component {...pageProps} />
        </SlideFade>
      </ChakraProvider>
    </RainbowKitProvider>
  </WagmiConfig>
);

export default wrapper.withRedux(MyApp);
