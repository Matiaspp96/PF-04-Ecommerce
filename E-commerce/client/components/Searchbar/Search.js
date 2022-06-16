import { Input, InputGroup, InputLeftElement, Spacer, Stack, Text, Button, useColorMode, color, } from '@chakra-ui/react'
import Link from 'next/link'
import {useState} from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import {getProductsByName} from '../../redux/actions/products'
import { useDispatch } from 'react-redux'

const Search = ({ toggle, isOpen }) => {
  const { colorMode } = useColorMode()
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const handleInputProducts = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }
  const handleSubmit = (e) => {
    // console.log(e)
    e.preventDefault()
    dispatch(getProductsByName(name))
    setName("")
  }


  const handleKeyDown = (event) => { 
    if(event.key === "Enter"){             
      event.preventDefault();             
      dispatch(getProductsByName(name));            
      setName('');         
    }    
  }

  return (
    <Stack spacing={4} width={{base:'50%',md:'50%'}}  ali={{base:'center'}}>
      <InputGroup 
      display={{ base: isOpen ? 'flex' : "none", md: "flex" }}
      ali={{base:'center'}}>
        <Input 
        onKeyDown = {(e) => handleKeyDown(e)}
        color='blackAlpha.700'
        borderStartRadius='15px' 
        borderEndRadius='0' 
        bgColor='#FAFAFC'
        border maxWidth='40em'
        type='text' 
        placeholder='Product...' 
        _placeholder={{color:'blackAlpha.700'}}
        onChange = {(e) => handleInputProducts(e)}
        value = {name}
        />
        <Button 
          borderStartRadius='0' 
          borderEndRadius='15px' 
          color='blackAlpha.800'
          bgColor='gray.300'
          onClick={(e) => handleSubmit(e)} type='submit'> <IoSearchSharp/>      
        </Button>
      </InputGroup>
    </Stack>
  )
}

export default Search

