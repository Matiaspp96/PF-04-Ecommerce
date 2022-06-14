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
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import UserImage from './UserImage';
import Link from 'next/link';
import axios from 'axios';
import { BASEURL } from '../../redux/actions/products';
import { useSelector } from 'react-redux';


const UserProfile = () => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const userState = useSelector(state => state.userReducer.user)
    console.log(user)

    useEffect(()=>{
    async function fetchDataUser(){
        const config = {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          };
        let getUser = await axios.get(`${BASEURL}/auth/data`, config);
        // let ordersUser = await axios.get(`${BASEURL}/orders/${getUser.data.user}`)
        setUser(getUser.data.user)
        setIsLoading(false)
        }
    fetchDataUser()
    },[isLoading])


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
    <Container mt={4}>
      <UserImage avatar={user.avatar} name={user.name} />
      <Center>
        <VStack>
          <Heading>{user.name}</Heading>
          <Text color="gray">
            {user.phone} {user.location} {user.email}
          </Text>
          <Text>History Orders:</Text>
          <HStack>
            {/* {user.orders?.map(order => (
              <Text colorScheme="blue" key={order}>
                {order.quantity}
                {order.products?.map(products =>{
                    <Text key={products._id}>
                    {products.name}
                    </Text>
                })}
              </Text> */}
            {/* ))} */}
            <Text>
            {user.orders.length}
            </Text>
            <Text>
            {/* <Link href=``>{user.orders[0]}</Link> */}
            </Text>
          </HStack>
        </VStack>
      </Center>
    </Container>
  );
};

export default UserProfile;