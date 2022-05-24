import { Flex, Image, Text, Stack } from "@chakra-ui/react";
import Link from 'next/link';
import { IoStarSharp } from 'react-icons/io5'

export default function CardMinimal({ producto }) {
    const { name, price, image, _id, rating } = producto;
    
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
          <Link 
            href={{
              pathname: 'product/[id]',
              query: {id:_id}
              }}>
              <a>
                <Text 
                  fontSize='1rem' 
                  fontWeight='bold'>
                    {name.substring(0,10)}
                </Text>
              </a>
          </Link>
          <Text color={'#1884BE'}>${price}</Text>
          <Flex alignItems={'center'}>
              <Text
                fontWeight={300}
                fontSize={'smaller'}
                me={'.4em'}>
                  {rating.rate}
              </Text>
              <IoStarSharp size='1em' />
            </Flex>
        </Stack>
    </Flex>
    )

    
}