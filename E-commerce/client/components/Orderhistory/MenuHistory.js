import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Center,
  Stack,
  Progress,
  Text,
  Box,
  Image,
  Flex,
  Container
} from '@chakra-ui/react'
import { FaEdit} from "react-icons/fa";
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
  const router = useRouter()

  useEffect(()=>{
  async function fetchDataUser(){ 
      let localUser = {};
      if(localStorage.getItem('userInfo')){
        localUser = JSON.parse(localStorage.getItem('userInfo'));
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
      <Box w='95vw'> 
        <Text><Link href='/'>Home </Link>/ My Orders</Text>
      <Center>

      <TableContainer 
        width={['100%', '100%', '100%', '100%', '100%']}
        
        >
          <Table 
            variant='striped'
            colorScheme= 'teal'
            size= 'lg'
            // borderColor= 'blue'          
          >
            <Thead>
              <Tr >
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
                      <Td p={1} alignItems={"center"} >
                        {order.products.map(ps=> {
                          return (
                          <Flex 
                            flexDirection={'column'}
                            alignItems='center'
                            width={{base:'30vw',md:'15vw',lg:'15vw'}}
                            hover={{
                              cursor: 'pointer'
                            }}
                            onClick= { () => router.push(`/product/${ps._id}`)} key={ps.name}>
                              <Image src={ps.image} boxSize={"50px"} alt={ps.name} />
                              <Link href={`/product/${ps._id}`}>
                                  {ps.name.substring(0,10)}
                              </Link>
                          </Flex>
                          )
                          })}
                      </Td>
                    </Td>
                    <Td p={1} textAlign={"center"}>{order.date}</Td>
                    <Td p={1} textAlign={"center"}>{order.statusPay}</Td>
                    <Td p={1} textAlign={"center"}>
                      {order.products.map(ps=>{return <Text p={'1.5rem 0'} key={ps.name}>{ps.quantity}</Text>})}
                      </Td>
                    <Td p={1} textAlign={"center"}>${order.cost}</Td>
                  </Tr>
                 
                )
              }
              )}
            </Tbody>
            
        </Table>
      </TableContainer>
      </Center>
      </Box>
  )
}
  
