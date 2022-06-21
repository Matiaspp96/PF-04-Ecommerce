import { Badge, Box, keyframes, Flex } from '@chakra-ui/react'
import '@fontsource/apfel-grotezk'
import Image from 'next/image'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import images from './Img/Images'


export default function BannerPets (){
    const [width,setWidth]= useState(0)
    const [posX, setPosX] = useState(0)
    const [isActive,setIsActive]= useState(false)
    const carousel = useRef()
    const scroll = keyframes`
    0% { transform: translateX(-${posX}); }
    100% { transform: translateX(calc(-250px * 5)) }
    `;
    const mixin = `
    white-gradient { background: linear-gradient(to right,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);}
    ` 

    useEffect(()=>{
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    })

    function handleActive(e){
        e.preventDefault();
        setIsActive(true)
    }

    function handleInactive(e, x){
        e.preventDefault();
        setPosX(x)
        setTimeout(()=>{
            setIsActive(false)
        }, 5000)
    }

    return (
        <Flex  h={{base:'fit-content', md:'fit-content', lg:'fit-content'}}
        as={motion.div}
        ref={carousel}
        drag='x' 
        dragConstraints={{
            right: 0,
            left: -width
        }}
        onDragStart={e => handleActive(e)}
        onDragEnd={(e,info) => handleInactive(e,info.point.x)}
        // dragMomentum={false}
        animation={isActive ? `none` : `${scroll} 40s linear infinite`}
        w={{base:'full', md:'fit-content', lg:'full'}}
        mt={{base: '.5em', md:'1em', lg:'1em'}}
        ml={{base: '0.5em'}}
        mr={{base: '0.5em'}}
        cursor='grab'
        gap={{base: '1rem', md:'1rem', lg:'1rem'}}
        >{images.map(img => {
            return(
            <Box pos='relative'
            zIndex='2' key={Math.random()} minW='fit-content' minH='fit-content' overflow='hidden' borderRadius='20px'>
                <Image src={img} width='250' height='360' key={img}/>
            </Box>
            )
        })

        }
        </Flex>
    )
  }