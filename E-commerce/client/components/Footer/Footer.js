import * as React from 'react'
import Image from 'next/image'
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  Flex,
  AspectRatio,
} from '@chakra-ui/react'

import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook} from 'react-icons/fa'
import { useState } from 'react'
import {useRouter} from 'next/router'



export default function Footer (){
  const router = useRouter()

  // const [map, setMap] = useState("Mendoza")
  return (
    
    <Flex as="footer" role="contentinfo" maxW='60%' alignItems='center' direction={{base: 'column'}} justifyContent='center'>
    <Stack
      spacing="8"
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      py={{ base: '12', md: '16' }}
    >
      <Image src='/Logo.png' alt = 'Logo Ecommerce' width="300px" height="200px"/>
      <Flex 
        as='footer2'
        direction={{ base: 'row', md: 'row', lg: 'row' }}
        spacing={{ base: '4', md: '8' }}
        justifyContent='center'
      >
        <Flex direction={{base: 'column'}} wrap='wrap' alignItems='center' spacing="8" minW="36">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Legal
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button variant="link">Privacy</Button>
              <Button variant="link">Terms</Button>
              <Button variant="link">License</Button>
            </Stack>
        </Flex>
        <Flex spacing="4" direction={{base: 'column'}} wrap='wrap' alignItems='center' minW="36" justifyContent={'flex-start'}>
          <Text fontSize="sm" fontWeight="semibold" color="subtle" alignItems="center">
               Up to date
          </Text>
          <Flex spacing="4" direction={{base: 'column'}} wrap='wrap' alignItems='center' minW="36">
            <Input placeholder="Enter your email" type="email" required />
            <Button variant="primary" type="submit" flexShrink={0}>
              Subscribe
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Stack>
    <Divider />
    <Stack
      pt="8"
      pb="12"
      justify="space-between"
      direction={{ base: 'column-reverse', md: 'row' }}
      align="center"
    >
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
        <br/>
       Patricias Argentinas 665, Maipú, Mendoza, Argentina.
      </Text>
      <ButtonGroup variant="ghost">
        <IconButton as="a" href="#"aria-label="LinkedIn" icon={<FaLinkedin fontSize="1.25rem" />}/>
        <IconButton as="a" href="#" aria-label="GitHub" icon={<FaInstagram fontSize="1.25rem" />} />
        <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter fontSize="1.25rem" />} />
        <IconButton as="a" href="#" aria-label="Facebook" icon={<FaFacebook fontSize="1.25rem" />} />
      </ButtonGroup>
    </Stack>
    </Flex>
  )
}
