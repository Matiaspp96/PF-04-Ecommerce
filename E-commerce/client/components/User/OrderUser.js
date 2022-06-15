import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Icon, Link, ListItem, UnorderedList } from '@chakra-ui/react'
import NextLink from "next/link";
import React from 'react'
import { AiFillClockCircle, AiOutlineClockCircle } from 'react-icons/ai'
import { IoCheckbox, IoCheckboxOutline, IoCheckmark, IoMedal } from 'react-icons/io5'

export default function OrderUser({order}) {
    const {buyer, cost, payment, phone, products, quantity, statusPay, shipping, _id, date} = order
  return (
    <Accordion minW='300px' allowToggle>
    <AccordionItem >
        <AccordionButton>
            {statusPay === "approved" ?
            <Flex justifyContent='flex-start' gap='1rem' alignItems='center'>
                <Icon><IoCheckmark size='1.5rem' /></Icon>
                Order Success
            </Flex> : 
            <Flex justifyContent='flex-start' gap='1rem' alignItems='center'>
                <Icon><AiOutlineClockCircle size='1.5rem' /></Icon>
                Order Pending
            </Flex>
            }
            <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
        <UnorderedList>
            <ListItem>Date : {date}</ListItem>
            <ListItem>Total payment: ${cost}</ListItem>
            <ListItem>Quantity products: {quantity}</ListItem>
        </UnorderedList>
        <NextLink href={`/orders`}>
            <Link color="#1884BE" borderRadius="15px" p="1em">
            View My Total Order
            </Link>
        </NextLink>
        </AccordionPanel>
    </AccordionItem>
    </Accordion>
  )
}


