import reviews from './ReviewMock.js'
import { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Avatar, Center, Text, Flex, Container, Stack, Button, Heading, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Textarea, ModalFooter, } from '@chakra-ui/react'

export default function Review(){
    const [index,setIndex] = useState(0);
    const {name,image,text} = reviews[index];
    const { isOpen, onOpen, onClose } = useDisclosure()
    const reviewRef = useRef()
  

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

  const addReview = ()=> {
    reviews.push({
      id: 12,
      name: "Guest",
      image: 'image',
      text: reviewRef.current.value
    })
    reviewRef.current = '';
    onClose()
  }

return (
  <>
    <Flex align='center' justify='center' direction='column' >
        <Heading textAlign='center' mb={4}>What others clients are saying about this...</Heading>
        <Center>
            <Avatar size='lg' name={name} src={image} />
        </Center>
        <Text>{name}</Text>
        <Container maxW='md' h={'28'}>
            <Text padding='2' align='justify'>{text}</Text>
        </Container>
        <Stack direction='row' spacing={4} padding='2'>
            <Button onClick={prevReview} leftIcon={<FaChevronLeft/>} colorScheme='blue' variant='solid'></Button>
            <Button onClick={nextReview} rightIcon={<FaChevronRight />} colorScheme='blue' variant='solid'></Button>
        </Stack>
        <Button onClick={onOpen} colorScheme='blue' variant='outline'>Leave a Review</Button>
    </Flex>
    <Modal
    isOpen={isOpen}
    onClose={onClose}
  >
    <ModalOverlay />
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
          <FormLabel>Leave your review:</FormLabel>
          <Textarea ref={reviewRef} placeholder='This was awesome! It meet all my needs. I fully recomended' />
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