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
import Map from '../Maps/Map'


export default function Footer (){

  // const [map, setMap] = useState("Mendoza")
  return (
    
    <Container as="footer" role="contentinfo" maxW='60%'>
    <Stack
      spacing="8"
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      py={{ base: '12', md: '16' }}
    >
      <Flex spacing={{ base: '6', md: '8' }} align="start">
        <Image src='/Logo.png' alt = 'Logo Ecommerce' width="300px" height="200px"/>
      </Flex>
      <Stack
        direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
        spacing={{ base: '12', md: '8' }}
      >
        <Stack direction="row" wrap='wrap' alignItems='center' spacing="8">
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Product
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button variant="link">options1</Button>
              <Button variant="link">options2</Button>
              <Button variant="link">options3</Button>
            </Stack>
          </Stack>
          <Stack spacing="4" minW="36">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Legal
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button variant="link">Privacy</Button>
              <Button variant="link">Terms</Button>
              <Button variant="link">License</Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing="4">
          <Text fontSize="sm" fontWeight="semibold" color="subtle">
            Stay up to date
          </Text>
          <Stack spacing="4" direction={{ base: 'column', sm: 'row' }} maxW={{ lg: '360px' }}>
            <Input placeholder="Enter your email" type="email" required />
            <Button variant="primary" type="submit" flexShrink={0}>
              Subscribe
            </Button>
          </Stack>
        </Stack>
      </Stack>
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
      <Map />
    </Container>
  )
}
