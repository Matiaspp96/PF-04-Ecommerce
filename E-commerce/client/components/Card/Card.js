import { Text, Flex, Stack, Image, IconButton, useBoolean, Tag, Center, Input, Button, Box } from '@chakra-ui/react'
import { IoCart, IoCartOutline, IoHeart, IoHeartOutline, IoStarSharp, IoTrashOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, addItemToCartInput, deleteItemOfCart, getItemsCart, getTotalItems, getTotalPrice, removeItemOfCart } from '../../redux/actions/cart';
import { addItemToFav, deleteItemOfFav } from '../../redux/actions/favorites';
import { handleAddToCartOrFav, handleRemoveFromCart, handleRemoveFromFav } from '../../utils/handles';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import router, { Router, useRouter } from 'next/router'


export default function Card({ producto, quantity, cart, setCart }) {
  const dispatch = useDispatch()
  const productsCart = useSelector((state)=> state.shoppingCartReducer.itemsCart);
  // const favs = useSelector((state)=> state.favoritesReducer.itemsFav);
  const [addFavorite, setAddFavorite] = useBoolean()
  const [removeFavorite, setRemoveFavorite] = useBoolean()
  const [addCart, setAddCart] = useBoolean()
  const [removeCart, setRemoveCart] = useBoolean()
  const { name, price, category, image, _id, rating } = producto;
  const router = useRouter();

  const [product, setProduct] = useState(producto);
  const [input, setInput] = useState();
  
  useEffect(()=>{
    dispatch(getItemsCart())
  }, [dispatch])
  

  /*-------- Total Price ---------*/
  const getTotalPrice = (cart) => {
    return cart?.reduce((acc,item) => acc + item.totalPrice, 0).toFixed(2) 
  }

  /*-------- Input quantity ---------*/
  const handleInputProducts = async (e, product) => {
    e.preventDefault()
    setInput(e.target.value)
    setProduct({...product, quantity: Number(e.target.value)})
  }
  
  const handleKeyDown = (event) => { 
    if(event.key === "Enter"){             
      event.preventDefault();         
      handleAddCartOnInput(event, product)
    }    
  }

  /*-------- Add Product to Cart & Fav ---------*/
  function handleAddCartOnInput(e, product){
    dispatch(addItemToCartInput(handleAddToCartOrFav(e, product)))
    dispatch(getTotalItems())
  }

  function handleAddCartOnClick(e, product){
    dispatch(addItemToCart(handleAddToCartOrFav(e, product)))
    dispatch(getTotalItems())
    setAddCart.on()
  }

  function handleAddFavOnClick(e, producto){
    dispatch(addItemToFav(handleAddToCartOrFav(e, producto)))
    setAddFavorite.toggle()
  }
  
  /*-------- Remove & Delete Product ---------*/
  function handleRemoveCartOnClick(e, producto){
    e.preventDefault();
    const product = {
      id: producto._id,
      price: producto.price,
    };
    dispatch(removeItemOfCart(product))
    dispatch(getTotalItems())
    getTotalPrice()
  }

  function handleRemoveOnClick(e, producto){
    dispatch(deleteItemOfCart(handleRemoveFromCart(e, producto)))
    setCart(getItemsCart())
    dispatch(getTotalItems())
    setRemoveCart.toggle()
  }

  function handleRemoveToFavOnClick(e, producto){
    dispatch(deleteItemOfFav(handleRemoveFromFav(e, producto)))
    setRemoveFavorite.toggle()
  }

  return (
      <Stack
        h={{base:'270', md:'290', lg:'365'}} 
        w={{base: router.route === '/cart' ? '90vw' : 'auto', md:'auto', lg:'auto'}}
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
        <Flex 
          flexDir='column'
          height='100%'
          justifyContent='space-between'
          alignItems='center'  >  
          <Center>
            <Image 
              src={image} 
              alt={name} 
              backgroundSize='cover'
              boxSize={{base:'80px', md:'100px', lg:'190px'}}
              alignItems='center'/>
          </Center>

          <Stack pl={'1rem'} pe={'1rem'} w='100%'>
            <Link 
              href={{
                pathname: 'product/[id]',
                query: {id:_id}
                }}>
                <a>
                  <Text 
                    fontSize='xl' 
                    fontWeight='bold'
                    noOfLines={2}>
                      {name}
                  </Text>
                </a>
            </Link>
                
            <Flex justifyContent={'space-around'} columnGap='0.2em'>
              <Text color={'#1884BE'}>${price}</Text>
              {cart ?
              <Flex alignItems='center' >
                <Button size='1.2em' w='1.5em' h='1.5em' display='flex' alignItems='strech' onClick={e=>handleRemoveCartOnClick(e,product)}>-</Button>
                <Input value={input}
                onKeyDown={e => handleKeyDown(e)} 
                onChange={e => handleInputProducts(e, product)}
                size='1.2em' w='1.5em' h='1.5em' borderRadius='5px'
                type='text' display='flex' textAlign='center' placeholder={quantity}></Input> 
                <Button size='1.2em' w='1.5em' h='1.5em' display='flex' alignItems='strech' onClick={e=>handleAddCartOnClick(e,product)}>+</Button>
              </Flex>
              : null}
              <Flex alignItems={'center'}>
                <Text
                  fontWeight={300}
                  fontSize={'smaller'}
                  me={'.4em'}>
                    {rating}
                </Text>
                <IoStarSharp size='1em' />
              </Flex>
            </Flex>
                
            {cart ?
              <Flex justifyContent={'space-evenly'} width='100%' alignItems='center'>
                <IconButton 
                  onClick={e=>handleAddCartOnClick(e,product)}
                  backgroundColor='transparent'
                  icon={<IoCart size='2em'/>}
                  color={addCart ? '#1884BE' : 'grey'}
                />
                <Text color={'#1884BE'}>{quantity}</Text> 
                <IconButton 
                  onClick={e=>handleRemoveOnClick(e,product)}
                  backgroundColor='transparent'
                  icon={<IoTrashOutline size='2em'/>}
                  color={removeCart ? '#1884BE' : 'grey'}
                /> 
              </Flex>
                :
              <Flex justifyContent={'space-evenly'} width='100%'>
                <IconButton 
                  onClick={e=>{handleAddCartOnClick(e,product)}}
                  backgroundColor='transparent'
                  icon={addCart ? <IoCart size='2em'/> : <IoCartOutline size='2em'/>}
                  color={addCart ? '#1884BE' : 'grey'}
                />
                { router.pathname === '/favorites' ?
                  <IconButton 
                  onClick={e=>handleRemoveToFavOnClick(e,product)}
                  backgroundColor='transparent'
                  icon={<IoTrashOutline size='2em'/>}
                  color={removeFavorite ? '#1884BE' : 'grey'}
                  /> 
                  : <IconButton 
                  onClick={e=>handleAddFavOnClick(e,product)}
                  backgroundColor='transparent'
                  icon={addFavorite ? <IoHeart size='2em'/> : <IoHeartOutline size='2em'/>}
                  color={addFavorite ? '#1884BE' : 'grey'}
                  />
                }
              </Flex>}
          </Stack>      
        </Flex>
      </Stack>
    )
  }
