import { Text, Flex, Stack, Image, IconButton, useBoolean, Tag, Center, Input, Button, Box } from '@chakra-ui/react'
import { IoCartOutline, IoHeartOutline, IoStarSharp, IoTrashOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, deleteItemOfCart, getItemsCart, getTotalItems } from '../../redux/actions/cart';
import { addItemToFav, deleteItemOfFav } from '../../redux/actions/favorites';
import { handleAddToCartOrFav, handleRemoveFromCart } from '../../utils/handles';
import Link from 'next/link';
import { useEffect } from 'react';


export default function Card({ producto, quantity, cart, setCart }) {
  const dispatch = useDispatch()
  const [addFavorite, setAddFavorite] = useBoolean()
  const [addCart, setAddCart] = useBoolean()
  const [removeCart, setRemoveCart] = useBoolean()

  useEffect(()=>{
    dispatch(getItemsCart())
  }, [dispatch])

  
  const { name, price, category, image, _id, rating } = producto;

  // const handleAddToCart = (item) => {
  //   item.preventDefault();
  //   const product = {
  //     id,
  //     title,
  //     price,
  //     description ,
  //     category,
  //     image
  //   };
  //   dispatch(addItemToCart(product))
  // }
  function handleAddCartOnClick(e, producto){
    dispatch(addItemToCart(handleAddToCartOrFav(e, producto)))
    dispatch(getTotalItems())
    setAddCart.on()
  }

  function handleAddFavOnClick(e, producto){
    dispatch(addItemToFav(handleAddToCartOrFav(e, producto)))
    setAddFavorite.toggle()
  }

  function handleRemoveOnClick(e, producto){
    dispatch(deleteItemOfCart(handleRemoveFromCart(e, producto)))
    setCart(getItemsCart())
    dispatch(getTotalItems())
    setRemoveCart.toggle()
  }

  return (
      <Stack
        h={{base:'240', md:'260', lg:'310'}} 
        overflow='auto'
        boxShadow='lg'
        >
        <Tag
          borderRadius={'none'}
          alignSelf={'flex-start'}
          fontSize={'x-small'}
          fontStyle={'italic'}>
            {category}
        </Tag>
        <Center>
          <Image 
            src={image} 
            alt={name}  
            boxSize={{base:'80px', md:'100px', lg:'150px'}}
            alignItems='center'/>
        </Center>

        <Stack pl={'1rem'} pe={'1rem'}>
          <Link 
            href={{
              pathname: 'product/[id]',
              query: {id:_id}
              }}>
              <a>
                <Text 
                  fontSize='xl' 
                  fontWeight='bold'>
                    {name}
                </Text>
              </a>
          </Link>
              
          <Flex justifyContent={'space-around'} columnGap='0.2em'>
            <Text color={'#1884BE'}>${price}</Text>
            {cart ?
            <Flex alignItems='center' >
              <Button size='1.2em' w='1.5em' h='1.5em' display='flex' alignItems='strech'>+</Button>
              <Input size='1.2em' w='1.5em' h='1.5em' borderRadius='5px' type='text' display='flex' textAlign='center' placeholder={quantity}></Input> 
              <Button size='1.2em' w='1.5em' h='1.5em' display='flex' alignItems='strech'>-</Button>
            </Flex>
            : null}
            <Flex alignItems={'center'}>
              <Text
                fontWeight={300}
                fontSize={'smaller'}
                me={'.4em'}>
                  {rating ? rating.rate : null}
              </Text>
              <IoStarSharp size='1em' />
            </Flex>
          </Flex>
              
          {cart ?
            <Flex justifyContent={'space-evenly'} width='100%' alignItems='center'>
              <IconButton 
                onClick={e=>handleAddCartOnClick(e,producto)}
                backgroundColor='transparent'
                icon={<IoCartOutline size='2em'/>}
                color={addCart ? '#1884BE' : 'grey'}
              />
              <Text color={'#1884BE'}>{quantity}</Text> 
              <IconButton 
                onClick={e=>handleRemoveOnClick(e,producto)}
                backgroundColor='transparent'
                icon={<IoTrashOutline size='2em'/>}
                color={removeCart ? '#1884BE' : 'grey'}
              /> 
            </Flex>
              :
            <Flex justifyContent={'space-evenly'} width='100%'>
              <IconButton 
                onClick={e=>handleAddCartOnClick(e,producto)}
                backgroundColor='transparent'
                icon={<IoCartOutline size='2em'/>}
                color={addCart ? '#1884BE' : 'grey'}
              />
              <IconButton 
              onClick={e=>handleAddFavOnClick(e,producto)}
              backgroundColor='transparent'
              icon={<IoHeartOutline size='2em'/>}
              color={addFavorite ? '#1884BE' : 'grey'}
              />
            </Flex>}
        </Stack>      
      </Stack>
    )
  }
