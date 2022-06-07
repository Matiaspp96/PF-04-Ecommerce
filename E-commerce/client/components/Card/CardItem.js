import { Flex, Image, Text, Stack, Box } from "@chakra-ui/react";
import Link from 'next/link';
import { IoStarSharp } from 'react-icons/io5'
import { useRouter } from 'next/router'

export default function CardItem({ producto, quantity }) {
    const { name, price, image, _id, rating } = producto;


    return (
        <Flex
        w={['110px','130px']} flexDir='column' alignItems='center' textAlign='center' justifyContent='space-between'
        overflow='auto'
        boxShadow='lg'
        p='0.5rem 0.5em'>
        <Image 
            src={image} 
            alt={name}  
            boxSize={{base:'80px', md:'80px', lg:'80px'}}
            alignItems='center'/>
        <Stack>
            <Text onClick={()=>router.push(`/product/${_id}`)}
                  fontSize='1rem' 
                  fontWeight='bold'>
                    {name.substring(0,10)}
            </Text>
            <Text >Quantity:<Text color={'#1884BE'}>{quantity}</Text></Text>
            <Text >Price/U: <Text color={'#1884BE'}>${price}</Text></Text>
            <Flex alignItems={'center'}>
            </Flex>
        </Stack>
    </Flex>
    )
}