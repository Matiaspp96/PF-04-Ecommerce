import { Input, InputGroup, InputLeftElement, Spacer, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Search = () => {
  return (
    <Stack spacing={8} width='50%'>
        <InputGroup>
            <Input maxWidth='40em' type='tel' placeholder='Phone number' />
        </InputGroup>
    </Stack>
  )
}

export default Search