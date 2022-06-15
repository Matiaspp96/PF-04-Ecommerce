import { Center, Container } from '@chakra-ui/react'
import React from 'react'
import CardMinimal from '../Card/CardMinimal'

export default function PsSugestions({PsDetail, sugestions, product, psSugestions}) {
  return (
    <Container
    overflow={{base:'visible', lg:'auto' }}>
    <Center fontSize='3xl' fontWeight={'bold'}>You may also like</Center>
    {psSugestions.map(ps=>{ return (
                <CardMinimal key={ps._id} producto={ps} />
            )})}
    </Container>
  )
}
