import { Text, Flex, Box, GridItem, Image } from '@chakra-ui/react'

export default function Card({ producto }) {
  
  const { title, image, category, price } = producto;
  
  return (
      <GridItem h='250' overflow='auto'>
              <Image 
                src={image} 
                alt={title}  
                boxSize='150px'/>
              <Text fontSize='xl'>{title.substring(0,15)}</Text>
              <Text as='i'>{category}</Text>
              <Text fontWeight='bold'>${price}</Text>
      </GridItem>
              
         
          
          
    )
  }