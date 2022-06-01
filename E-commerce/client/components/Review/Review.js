import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { IoStarSharp } from 'react-icons/io5'
import { getProductReviews } from '../../redux/actions/products';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Box, FormHelperText, Radio, RadioGroup, Avatar, Center, Text, Flex, Container, Stack, Button, Heading, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Textarea, ModalFooter, SimpleGrid, Grid, GridItem } from '@chakra-ui/react'

const Review = ({reviews, id, postReview}) => {
    const [index,setIndex] = useState(0);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const reducerUser = useSelector((state)=> state.userReducer.user);
    const [response,setResponse] = useState('')

    const [newReview,setNewReview] = useState({
      punctuation: 1,
      opinion:'',
      users: {
        _id: '',
        email: ''
      }
    })

    useEffect(() => {
      const newUser = {_id: reducerUser._id, email: reducerUser.email}
      setNewReview({...newReview, users: newUser })
    }, [reducerUser]);

    const [charactersUse,setCharactersUse] = useState(0);
    
    useEffect(() => {
      if(reviews.length){
        dispatch(getProductReviews(reviews[index]))
      }
      },[dispatch,reviews,index]);


    const review = useSelector((state)=> state.productReducer.reviews);

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

      const handleChange = (e)=>{
        if(!e.target){
          setNewReview({...newReview, punctuation: Number(e)})
        } else {
          setNewReview({...newReview, opinion: e.target.value})
          let input = e.target.value;
          setCharactersUse(input.length)
        }
      }
    

      const addReview = async()=> {
        try {
          const response = await axios.post(`http://localhost:3001/api/reviews/${id}/`, newReview)
          setResponse(response)
        } catch (error) {
          setResponse(error)
        }
        
        setNewReview({
          punctuation: 1,
          opinion:'',
          users: {
            _id: '',
            email: ''
          }
        })
        postReview(true)
        console.log(response)
        onClose()
      }
    

  return (
    <>
  {reviews.length && review && review.opinion ?
  <Box>
  <Grid 
    alignItems={'center'} 
    templateColumns={'repeat(3,1fr)'}
    >
      <GridItem colSpan={{base:'3', xl:'1'}}>
        <Stack>
            <Center>
              <Avatar size='lg' name={review.name} src={''} />
            </Center>
            <Text textAlign={'center'} fontWeight={'bold'}>{review.name}</Text>
            <Flex alignItems={'center'} justifyContent='center'>
              <Text
                fontWeight={300}
                fontSize={'smaller'}
                me={'.4em'}>
                  {review.punctuation}
              </Text>
              <IoStarSharp size='1em' />
          </Flex> 
          </Stack>
      </GridItem>

      <GridItem colSpan={{base:'3', xl:'2'}}>
        <Flex maxW='md' h={'fit-content'} ml={{base:'0', xl:'1rem'}} alignItems={'center'}>
          <Text  padding='2' align='justify' fontSize={'larger'}>{review.opinion}</Text>
        </Flex>
      </GridItem>
  </Grid>

  <Center>
    <Flex padding='2' direction={{base:'column', xl:'row'}}>{
      reviews.length > 1 &&
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
    }
      <Button
        onClick={onOpen}
        colorScheme='blue'
        variant='outline'>
          Leave a Review
      </Button>
    </Flex>
  </Center>
</Box> 
: 
<Stack alignItems={'center'}>
  <Box my={'2rem'}>
    <Text fontStyle={'italic'}>Sorry, theres's no review for this product yet.</Text>
  </Box>
  <Button
    onClick={onOpen}
    colorScheme='blue'
    variant='outline'>
      Leave a Review
  </Button>
</Stack> }
    
    
    
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
            <RadioGroup onChange={handleChange} value={newReview.punctuation} defaultValue={1}>
              <Flex mb={'0.5rem'}>
                <Radio value={1}>1 </Radio>
                <Radio value={2}>2 </Radio>
                <Radio value={3}>3 </Radio>
                <Radio value={4}>4 </Radio>
                <Radio value={5}>5 </Radio>
              </Flex>
            </RadioGroup>

            <FormLabel>Leave your review:</FormLabel>
            <Textarea 
              name='opinion'
              value= {newReview.opinion}
              onChange={handleChange} 
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

export default Review