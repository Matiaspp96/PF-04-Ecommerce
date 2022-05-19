import { Input, InputGroup, InputLeftElement, Spacer, Stack, Text, Button, } from '@chakra-ui/react'
import Link from 'next/link'
import {useState} from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import {getProductsByName} from '../../redux/actions/products'
import { useDispatch } from 'react-redux'

const Search = () => {

  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const handleInputProducts = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }
  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    dispatch(getProductsByName(name))
    setName("")
  }

  return (
    <Stack spacing={4} width='50%' >
      <InputGroup>
        <InputLeftElement><IoSearchSharp/></InputLeftElement>
        <Input 
        borderRadius='15px' 
        bgColor='#FAFAFC'
        border maxWidth='40em' 
        type='text' 
        placeholder='Product...' 
        onChange = {(e) => handleInputProducts(e)}
        value = {name}
        />
        <Button onClick={(e) => handleSubmit(e)} type='submit'> Search</Button>
      </InputGroup>
    </Stack>
  )
}

export default Search
