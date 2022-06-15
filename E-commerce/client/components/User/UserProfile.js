import React, { useEffect, useState } from 'react';
import {
  Container,
  Center,
  Heading,
  Text,
  VStack,
  HStack,
  Stack,
  Progress,
  OrderedList,
  ListItem,
  Box,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import UserImage from './UserImage';
import Link from 'next/link';
import axios from 'axios';
import { BASEURL } from '../../redux/actions/products';
import { useSelector } from 'react-redux';
import OrderUser from './OrderUser';


const UserProfile = () => {
    const [user, setUser] = useState(null)
    const [order, setOrder] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const userState = useSelector(state => state.userReducer.user)
    console.log(userState)
    useEffect(()=>{
    async function fetchDataUser(){
        const config = {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          };
        let getUser = await axios.get(`${BASEURL}/auth/data`, config);
        try{
          // let ordersUser = await axios.get(`${BASEURL}/orders/${getUser.data.user._id}/orderlist`)
          let ordersUser = await axios.get(`${BASEURL}/orders/62999a9589e817d325d46bb4/orderlist`)
          setOrder(ordersUser.data)
          setUser(getUser.data.user)
          setIsLoading(false)
          console.log(ordeordersUserr, getUser)
        } catch(err){
          console.log(err.response.data)
          setOrder(0)
        }
        }
    fetchDataUser()
    })


    if(isLoading){
        return (
          <Center h={"100vh"}>
            <Stack>
              <Heading>Just a moment</Heading>
              <Progress size="md" isIndeterminate />
            </Stack>
          </Center>
        )
      }

  return (
    <Box w='95vw'>
      <Text><Link href='/'>Home </Link>/ My Account</Text>
    <Container mt={4}>
      {/* <UserImage avatar={user.avatar === null ? "https://i.pinimg.com/originals/0b/e7/20/0be720d92134fbdbb80102333ff2b6f5.png" : user.avatar} name={user.name} /> */}
      <Center>
        <VStack>
          <Heading>{user.name}</Heading>
          <Text color="gray">
            {user.phone} {user.location} {user.email}
          </Text>
          <Text>Your History Orders:</Text>
          <HStack>
            <OrderedList>
              {order?.map(o => (
                <ListItem key={Math.random()}><OrderUser order={o} key={Math.random()}/></ListItem>
              ))
             }
            </OrderedList>
          </HStack>
        </VStack>
      </Center>
    </Container>
    </Box>
  );
};

export default UserProfile;


