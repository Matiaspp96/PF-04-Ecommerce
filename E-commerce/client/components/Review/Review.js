import reviews from './ReviewMock.js'
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Avatar, Center, Text, Flex, Container, Stack, Button, Heading } from '@chakra-ui/react'

export default function Review(){
    const [index,setIndex] = useState(0);
    const {name,image,text} = reviews[index];

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

return (
    <Flex align='center' justify='center' direction='column' >
        <Heading mb={4}>What others clients are saying about this...</Heading>
        <Center>
            <Avatar size='lg' name={name} src={image} />
        </Center>
        <Text>{name}</Text>
        <Container maxW='md'>
            <Text padding='2' align='justify'>{text}</Text>
        </Container>
        <Stack direction='row' spacing={4} padding='2'>
            <Button onClick={prevReview} leftIcon={<FaChevronLeft/>} colorScheme='blue' variant='solid'></Button>
            <Button onClick={nextReview} rightIcon={<FaChevronRight />} colorScheme='blue' variant='outline'></Button>
        </Stack>
    </Flex>
)
}