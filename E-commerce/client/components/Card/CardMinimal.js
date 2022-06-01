import { Flex, Image, Text, Stack } from "@chakra-ui/react";
import Link from 'next/link';
import { IoStarSharp } from 'react-icons/io5'
import { useRouter } from 'next/router'

export default function CardMinimal({ producto }) {
    const { name, price, image, _id, rating } = producto;
    const router = useRouter()
    return (
        <Flex 
        overflow='auto'
        boxShadow='lg'
        p='1rem'
        >
        <Image 
            src={image} 
            alt={name}  
            boxSize={{base:'80px', md:'100px', lg:'180px'}}
            alignItems='center'/>

        <Stack pl={'1rem'} pe={'1rem'}>
            <Text onClick={()=>router.push(`/product/${_id}`)}
                  fontSize='1rem' 
                  fontWeight='bold'>
                    {name.substring(0,10)}
            </Text>
            <Text color={'#1884BE'}>${price}</Text>
            <Flex alignItems={'center'}>
              <Text
                fontWeight={300}
                fontSize={'smaller'}
                me={'.4em'}>
                  {rating}
              </Text>
              <IoStarSharp size='1em' />
            </Flex>
        </Stack>
    </Flex>
    )
}