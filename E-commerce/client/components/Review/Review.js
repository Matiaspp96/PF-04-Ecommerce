import reviews from './ReviewMock.js'
import { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoStarSharp } from 'react-icons/io5'
import { Box, FormHelperText, Radio, RadioGroup, Avatar, Center, Text, Flex, Container, Stack, Button, Heading, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Textarea, ModalFooter, SimpleGrid, Grid, GridItem  } from '@chakra-ui/react'

export default function Review(){
    const [index,setIndex] = useState(0);
    const {name,image, opinion, punctuation} = reviews[index];
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [points,setPoints] = useState('1')
    const [msg,setMsg] = useState('')
    const [charactersUse,setCharactersUse] = useState(0);
  

  const checkNumber = (num)=>{
    if(num > reviews.length -1){
      return 0
    }
    if(num < 0){
      return reviews.length -1
    }
    return num;
  }

  const nextReview = ()=>{
    setIndex((index)=>{
      let newIndex = index+1;
      return checkNumber(newIndex);
    })
  }

  const prevReview = ()=>{
    setIndex((index)=>{
      let newIndex = index-1;
      return checkNumber(newIndex);
    })
  }

  const handleMsgChange = (e)=>{
    let input = e.target.value;
    setCharactersUse(input.length)
    setMsg(input)
  }

  
  const addReview = (e)=> {
    reviews.push({
      name: "Guest",
      opinion: msg,
      punctuation: points

    })
    setPoints('1')
    setMsg('')
    onClose()
  }

return (
  <>
    <Grid 
      alignItems={'center'} 
      templateColumns={'repeat(3,1fr)'}
      >
        <GridItem colSpan={{base:'3', xl:'1'}}>
          <Stack>
              <Center>
                <Avatar size='lg' name={name} src={image} />
              </Center>
              <Text textAlign={'center'} fontWeight={'bold'}>{name}</Text>
              <Flex alignItems={'center'} justifyContent='center'>
                <Text
                  fontWeight={300}
                  fontSize={'smaller'}
                  me={'.4em'}>
                    {punctuation}
                </Text>
                <IoStarSharp size='1em' />
            </Flex> 
            </Stack>
        </GridItem>

        <GridItem colSpan={{base:'3', xl:'2'}}>
          <Flex maxW='md' h={'fit-content'} ml={{base:'0', xl:'1rem'}} alignItems={'center'}>
            <Text  padding='2' align='justify' fontSize={'larger'}>{opinion.substring(0,200)}</Text>
          </Flex>
        </GridItem>
    </Grid>

    <Center>
      <Flex padding='2' direction={{base:'column', xl:'row'}}>
        <Flex justifyContent={'space-between'} paddingBottom={{base:'2'}}>
          <Button
            me={'1em'} 
            onClick={prevReview} 
            leftIcon={<FaChevronLeft/>} 
            colorScheme='blue' 
            variant='solid'></Button>
          <Button 
            me={{base:'0', xl:'1em'}}
            onClick={nextReview}
            rightIcon={<FaChevronRight />}
            colorScheme='blue'
            variant='solid'>  
          </Button>
        </Flex>
        <Button
          onClick={onOpen}
          colorScheme='blue'
          variant='outline'>
            Leave a Review
        </Button>
      </Flex>
    </Center>
    
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>
          <Center>
              <Avatar size='lg' name={'Weolcome guest'} src={'Welcome Guest'} />
          </Center>
          <Center>
            <Text>Welcome Guest</Text>
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>How much do you like this product?</FormLabel>
            <RadioGroup onChange={setPoints} value={points} defaultValue='1'>
              <Flex mb={'0.5rem'}>
                <Radio value='1'>1 </Radio>
                <Radio value='2'>2 </Radio>
                <Radio value='3'>3 </Radio>
                <Radio value='4'>4 </Radio>
                <Radio value='5'>5 </Radio>
              </Flex>
            </RadioGroup>

            <FormLabel>Leave your review:</FormLabel>
            <Textarea 
              name='opinion'
              value= {msg}
              onChange={handleMsgChange} 
              placeholder='This was awesome! It meet all my needs. I fully recomend it'
              maxLength={'250'} />
              <FormHelperText>{charactersUse}/250</FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={addReview} colorScheme='blue' mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
)
}