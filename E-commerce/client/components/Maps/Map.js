import React from 'react'
import {
  AspectRatio,
  Button,
  Flex,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function Map() {

  const [map, setMap] = useState("Mendoza")

  return (
    <div>
    <Flex>
      <Button
      onClick={() => setMap("Mendoza")}
      >
        Sucursal Mendoza, Argentina.
      </Button>
      <Button
      onClick={() => setMap("Tucuman")}
      >
        Sucursal Tucuman, Argentina.
      </Button>
    </Flex>
      <AspectRatio ratio={16 / 9}>
        <iframe 
          width="600" 
          height="450" 
          loading="lazy" 
          src= {map === "Mendoza"? " https://www.google.com/maps/embed/v1/place?q=place_id:EjRQYXRyaWNpYXMgQXJnZW50aW5hcyA2NjUsIE1haXDDuiwgTWVuZG96YSwgQXJnZW50aW5hIjESLwoUChIJ_c3gfOoMfpYRFpsbxCr6sIQQmQUqFAoSCYFYdDPADH6WEdOuwchcCUaz&key=AIzaSyD7h-X8fVeczCSnntbmA0ORIIiVyEIXRSg": "https://www.google.com/maps/embed/v1/place?q=place_id:EklEci4gw4FuZ2VsIEdlcmFyZG8gUGlzYXJlbGxvLCBTYW4gTWlndWVsIGRlIFR1Y3Vtw6FuLCBUdWN1bcOhbiwgQXJnZW50aW5hIi4qLAoUChIJkfucVaVbIpQRVVZNJETBKXMSFAoSCQNpxdaSNyKUESdlxbWSW434&key=AIzaSyD7h-X8fVeczCSnntbmA0ORIIiVyEIXRSg"}>
        </iframe>
      </AspectRatio>
    </div>
  )
}
