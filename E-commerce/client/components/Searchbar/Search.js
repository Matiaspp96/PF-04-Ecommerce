import { Input, InputGroup, InputLeftElement, Spacer, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { IoSearchSharp } from 'react-icons/io5'

const Search = () => {
  return (
    <Stack spacing={4} width='50%' >
        <InputGroup>
            <InputLeftElement><IoSearchSharp/></InputLeftElement>
            <Input borderRadius='15px' bgColor='#FAFAFC'border maxWidth='40em' type='text' placeholder='Product...' />
        </InputGroup>
    </Stack>
  )
}

export default Search