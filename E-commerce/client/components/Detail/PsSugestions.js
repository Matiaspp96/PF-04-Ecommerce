import { Center, Container } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import CardMinimal from '../Card/CardMinimal'

export default function PsSugestions({setIsLoading, isLoading, PsDetail, sugestions, product, psSugestions}) {

    useEffect(()=>{
        if(isLoading){
          async function getProduct(){
            setPsDetail(ps => {
                let newPs={
                    ...ps,
                    product
                };
                return newPs;
              })
            }
          async function getSug(){
            setPsSugestions(ps => {
              let newPs= sugestions.filter((ps)=>{
                    if(ps.category?.includes(product.category[0])){
                      return ps
                    }})
                    .slice(0,3)
              return newPs;
            })
            }
            getProduct()
            getSug()
            if(psSugestions){
              setIsLoading(false)
            }
        }}, [isLoading])
        console.log(psSugestions)
  
  
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
