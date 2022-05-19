import { Text, Flex, Box, GridItem, Image } from '@chakra-ui/react'
import Link from 'next/link';

export default function Card({ producto }) {
  
  const { title, image, category, price, id } = producto;
  
  return (
      <GridItem h='250' overflow='auto'>
              <Image 
                src={image} 
                alt={title}  
                boxSize='150px'/>
              <Text fontSize='xl'>{title.substring(0,15)}</Text>
              <Text as='i'>{category}</Text>
              <Text fontWeight='bold'>${price}</Text>
              <Link href={{
                pathname: 'product/[id]',
                query: {id:id}
              }}>
                <a>Ver Detalle</a>
              </Link>
      </GridItem>
              
         
          
          
    )
  }