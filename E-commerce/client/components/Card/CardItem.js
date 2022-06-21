import { Flex, Image, Text, Stack, Box, Tag } from "@chakra-ui/react";
import Link from 'next/link';
import { IoStarSharp } from 'react-icons/io5'
import { useRouter } from 'next/router'

export default function CardItem({ producto, quantity }) {
    const { name, price, image, _id, rating } = producto;


    return (
        <Flex
        w='100%'  flexDir='row' alignItems='center' textAlign='center' justifyContent='space-between'
        overflow='auto'
        boxShadow='lg'
        p='0.5rem 0.5em' gap='1rem' borderRadius='7.5px'>
        <Image 
            src={image} 
            alt={name}  
            boxSize={{base:'80px', md:'80px', lg:'80px'}}
            alignItems='center'/>
        <Link href={`/product/${_id}`}>
                {name.substring(0,10)}
        </Link>
        <Flex flexDir='column'>
        <Text >Quantity<Text color={'#1884BE'}>{quantity}</Text></Text>
        <Text >Subtotal<Text color={'#1884BE'}>${quantity * price}</Text></Text>
        </Flex>
    </Flex>
    )
}