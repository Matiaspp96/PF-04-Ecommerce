import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Center,
  Stack,
  Progress,
  Text,
  Flex
} from '@chakra-ui/react'

import React, { useState, useEffect } from 'react';
import { OrderUser } from '../User/OrderUser';
import { BASEURL } from '../../redux/actions/products';
import { useRouter } from 'next/router';
// import { OrderHistory } from './OrderHistory';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';



export default function MenuHistory() {
  const [user, setUser] = useState(null)
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const userState = useSelector(state => state.userReducer.user)
  // console.log(userState)
  useEffect(()=>{
  async function fetchDataUser(){ 
      let localUser = {};
      if(localStorage.getItem('userInfo')){
        localUser = JSON.parse(localStorage.getItem('userInfo'));
        // console.log(`este es el localUser${localUser}`)
      }
      if(Object.keys(localUser).length !== 0){
          setUser(localUser)
      }
      
      try{
        let ordersUser = await axios.get(`${BASEURL}/orders/${localUser._id}/orderlist`)
        setOrder(ordersUser.data)
      } catch(err){
        setOrder(0)
      }
      setIsLoading(false)
      }
  fetchDataUser()
  },[isLoading])
  console.log(order)

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
      <TableContainer 
        minW='100%'>
          <Table 
            variant='striped'
            colorScheme= 'blue'
            size= 'lg'
            borderColor= 'blue'          
          >
            <Thead>
              <Tr>
                <Th p={1} textAlign={"center"}>Products</Th>
                <Th p={1} textAlign={"center"}>Date</Th>
                <Th p={1} textAlign={"center"}>order status</Th>
                <Th p={1} textAlign={"center"}>Quantity products</Th>
                <Th p={1} textAlign={"center"}>Total payment</Th>
              </Tr>
            </Thead>
            <Tbody>
              {order.map((order)=>{
                return(
                  <Tr key={order._id}>
                    <Td p={1} textAlign={"center"}>
                      <Td p={1} textAlign={"center"}>
                        {order.products.map(ps=>{return <Text key={ps.name}>{ps.name}</Text>})}
                      </Td>
                    </Td>
                    <Td p={1} textAlign={"center"}>{order.date}</Td>
                    <Td p={1} textAlign={"center"}>{order.statusPay}</Td>
                    <Td p={1} textAlign={"center"}>{order.quantity}</Td>
                    <Td p={1} textAlign={"center"}>${order.cost}</Td>
                  </Tr>
                 
                )
              }
              )}
            </Tbody>
            
        </Table>
      </TableContainer>
  )
}
  
