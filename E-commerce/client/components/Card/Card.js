import { Text, Flex, Stack, IconButton, useBoolean, Tag, Center, Input, Button, Box, useColorMode, InputGroup, NumberInput, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInputStepper } from '@chakra-ui/react'
import { IoCart, IoCartOutline, IoHeart, IoHeartOutline, IoStarSharp, IoTrashOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Image from 'next/image'
import { addItemToCart, addItemToCartInput, deleteItemOfCart, getItemsCart, getTotalItems, getTotalPrice, removeItemOfCart } from '../../redux/actions/cart';
import { addItemToFav, deleteItemOfFav } from '../../redux/actions/favorites';
import { handleAddToCartOrFav, handleRemoveFromCart, handleRemoveFromFav } from '../../utils/handles';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import router, { Router, useRouter } from 'next/router'
import {getAllCategories} from '../../redux/actions/categories';


export default function Card({ producto, quantity, cart, setCart }) {
  const dispatch = useDispatch()
  const productsCart = useSelector((state)=> state.shoppingCartReducer.itemsCart);
  // const favs = useSelector((state)=> state.favoritesReducer.itemsFav);
  const [addFavorite, setAddFavorite] = useBoolean()
  const [removeFavorite, setRemoveFavorite] = useBoolean()
  const [addCart, setAddCart] = useBoolean()
  const [removeCart, setRemoveCart] = useBoolean()
  const { name, price, category, image, _id, rating, stock } = producto;
  const router = useRouter();
  const { colorMode } = useColorMode();

  const [product, setProduct] = useState(producto);
  const [input, setInput] = useState();
  
  useEffect(()=>{
    dispatch(getItemsCart())
    console.log(productsCart)
  }, [dispatch])
  
  const categories = useSelector((state) => state.categoriesReducer.categories);

  const getCategoryName = (id)=>{
  let cat;
  categories.map(cs=>{
    if(cs._id === id){
      cat = cs.name
    }
  });
    return cat
  }

  // useEffect(() => {
  //   dispatch(getAllCategories());
  // }
  // , [dispatch]);

  /*-------- Total Price ---------*/
  const getTotalPrice = (cart) => {
    return cart?.reduce((acc,item) => acc + item.totalPrice, 0).toFixed(2) 
  }

  /*-------- Input quantity ---------*/
  const handleInputProducts = async (e, product) => {
    console.log(e, product)
    if(Number(e.target.value) < stock + 1){
      setInput(e.target.value)
      setProduct({...product, quantity: Number(e.target.value)})
    }
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
    console.log(producto)
    dispatch(deleteItemOfFav(handleRemoveFromFav(producto)))
    setRemoveFavorite.toggle()
  }

  return (
      <Flex
        as={motion.div}
        flexDir='column'
        h={{base: router.route === '/cart' || router.route === '/favorites' ? '58vh' : '46vh', md:'290', lg: router.route === '/cart' ? '430' : '365'}} 
        w={{base: router.route === '/cart' || router.route === '/favorites' ? '85vw' : '45vw', md:'22.5vw', lg:'100%'}}
        maxW={{base: router.route === '/cart' || router.route === '/favorites' ? '90vw' : '45vw', md:'auto'}}
        overflow='auto'
        borderBottomRadius='15px'
        whileHover={{ scale: 1.1 }}
        >
        {<Tag
          borderRadius={'none'}
          alignSelf={'flex-start'}
          fontSize={'x-small'}
          fontStyle={'italic'}>
            {category?.map(e => 
            <Text key={e}>
              {getCategoryName(e)} { e !== category[category.length-1] ? '-' : ''}
            </Text>)}
        </Tag>}
        <Flex
          pt='0.5em'
          bgColor={colorMode === 'light' ? 'blackAlpha.200' : 'whiteAlpha.200'} 
          flexDir='column'
          height='100%'
          borderTopRightRadius='15px'
          boxShadow='xl'
          justifyContent='space-between'
          alignItems='center'>  
          <Center>
            {/* <Box pos='relative'
            zIndex='2' key={Math.random()} minW='fit-content' minH='fit-content' overflow='hidden' borderRadius='20px'>> */}
            <Image 
              src={image} 
              alt={name} 
              // backgroundSize='cover'
              width={ router.route === '/cart' ? '250' : '190'} height={ router.route === '/cart' ? '250' : '190'}
              // boxSize={{base: router.route === '/cart' ? '40vh' : '20vh', md:'100px', lg: router.route === '/cart' ? '250' :'190px'}}
              alignItems='center'/>
            {/* </Box> */}
          </Center>

          <Flex flexDir='column' pl={'1rem'} pe={'1rem'} w='100%'>
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
                
            <Flex justifyContent={'space-around'} alignItems='center' h='2.5rem' columnGap='0.2em'>
              <Text fontSize='md' color={'#1884BE'}>${price}</Text>
              {cart ?
              <Flex alignItems='center' justifyContent='center'>
                {/* <Button alignItems='center' w='2rem' h='2rem' display='flex' onClick={e=>handleRemoveCartOnClick(e,product)}>-</Button>
                <Input value={input}
                onKeyDown={e => handleKeyDown(e)} 
                onChange={e => handleInputProducts(e, product)}
                w='3.5rem' h='2rem' borderRadius='5px'
                type='number' display='flex' textAlign='center' placeholder={quantity}></Input> 
                <Button alignItems='center' w='2rem' h='2rem' display='flex' onClick={e=>handleAddCartOnClick(e,product)}>+</Button> */}
                <InputGroup>
                  <NumberInput min={1} max={stock}>
                    <NumberInputField w='6rem' placeholder={quantity} value={input} onChange={e => handleInputProducts(e, product)} onKeyDown={e => handleKeyDown(e)} />
                    <NumberInputStepper>
                    <NumberIncrementStepper value={input} onClick={e=> {if(quantity < stock ) {handleAddCartOnClick(e,product)}}} />
                    <NumberDecrementStepper onClick={e=>handleRemoveCartOnClick(e,product)}/>
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>
              </Flex>
              : null}
              <Flex alignItems={'center'}>
                <Text
                  fontWeight={300}
                  fontSize='md'
                  me={'.4em'}>
                    {rating}
                </Text>
                <IoStarSharp size='1em' />
              </Flex>
            </Flex>
                
            {cart ?
              <Flex justifyContent={'space-evenly'} width='100%' alignItems='center'>
                <IconButton 
                  onClick={e=>{if(quantity < stock ) {handleAddCartOnClick(e,product)}}}
                  backgroundColor='transparent'
                  icon={<IoCart size='2em'/>}
                  color={addCart ? '#1884BE' : 'grey'}
                />
                {quantity === stock ? <Text color={'#1884BE'}>{quantity} Max</Text> : <Text color={'#1884BE'}>{quantity}</Text>} 
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
          </Flex>      
        </Flex>
      </Flex>
    )
  }
