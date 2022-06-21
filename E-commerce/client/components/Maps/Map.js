import React from 'react'
import {
  AspectRatio,
  Button,
  Flex,
  Container
} from '@chakra-ui/react'
import { useState } from 'react'


export default function Map() {
  const [map, setMap] = useState("Mendoza")
  return (
    <Container 
    as="map" 
    maxW='95%'
    w={{base: '95%', md:'80%', lg:'80%', xl:'80%'}}
    >

    <Flex  
       justifyContent={{ base: "center" }}
       h={{ base: "8em", lg: "3em" }}
       gap="1em"
       flexDir={{ base: "column", lg: "row" }}
       whiteSpace="nowrap"
       w={{base: '95%', md:'100%', lg:'100%'}}
       mt={{base: '.5em', md:'1em', lg:'1em'}}
      //  minW={{base:'75%' ,md:'100%', lg:'100%'}} 
      >
      <Button 
      fontSize={['md', 'md', 'lg']}
      onClick={() => setMap("Mendoza")}
      >
        Sucursal Mendoza, Argentina.
      </Button>
      <Button 
      fontSize={['md', 'md', 'lg']}
      onClick={() => setMap("Tucuman")}
      >
        Sucursal Tucuman, Argentina.
      </Button>
    </Flex>
      <AspectRatio 
      ratio={16 / 9}>
        <iframe 
          width="1200" 
          height="800" 
          loading="lazy" 
          src= {map === "Mendoza"? " https://www.google.com/maps/embed/v1/place?q=place_id:EjRQYXRyaWNpYXMgQXJnZW50aW5hcyA2NjUsIE1haXDDuiwgTWVuZG96YSwgQXJnZW50aW5hIjESLwoUChIJ_c3gfOoMfpYRFpsbxCr6sIQQmQUqFAoSCYFYdDPADH6WEdOuwchcCUaz&key=AIzaSyD7h-X8fVeczCSnntbmA0ORIIiVyEIXRSg": "https://www.google.com/maps/embed/v1/place?q=place_id:EklEci4gw4FuZ2VsIEdlcmFyZG8gUGlzYXJlbGxvLCBTYW4gTWlndWVsIGRlIFR1Y3Vtw6FuLCBUdWN1bcOhbiwgQXJnZW50aW5hIi4qLAoUChIJkfucVaVbIpQRVVZNJETBKXMSFAoSCQNpxdaSNyKUESdlxbWSW434&key=AIzaSyD7h-X8fVeczCSnntbmA0ORIIiVyEIXRSg"}>
        </iframe>
      </AspectRatio>
    </Container>)
}
