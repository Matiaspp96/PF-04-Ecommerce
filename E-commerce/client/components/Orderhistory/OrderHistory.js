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
  Text
} from '@chakra-ui/react'

import { useState, useEffect } from 'react'
import { OrderUser } from '../User/OrderUser'
import { BASEURL } from '../../redux/actions/products'
import React from 'react'
import { useRouter } from 'next/router'

export default function MenuHistory({order}) {
  const { cost, products, quantity, statusPay, date} = order
  const router = useRouter()
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
              <Tr key={_id}>
                <Td p={1} textAlign={"center"}>
                  {products}
                </Td>
                <Td p={1} textAlign={"center"}>
                  {date}
                </Td>
                <Td p={1} textAlign={"center"}>
                  {statusPay}
                </Td>
                <Td p={1} textAlign={"center"}>
                  {quantity}
                </Td>
                <Td p={1} textAlign={"center"}>
                  {cost}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
  )
}
