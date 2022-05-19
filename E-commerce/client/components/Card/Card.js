import { Text, GridItem, Image, Button } from '@chakra-ui/react'
import {IoCartOutline, IoHeartOutline} from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../redux/actions/cart';
import { addItemToFav } from '../../redux/actions/favorites';
import { handleAddToCartOrFav } from '../../utils/handles';

export default function Card({ producto }) {
  const dispatch = useDispatch()
  const { title, price, category, image } = producto;

  const itemsCart = useSelector((state) => state.shoppingCartReducer.itemsCart)
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
    console.log(itemsCart)
  }

  function handleAddFavOnClick(e, producto){
    dispatch(addItemToFav(handleAddToCartOrFav(e, producto)))
    console.log(producto)
  }

  return (
      <GridItem h='250' overflow='auto'>
              <Image 
                src={image} 
                alt={title}  
                boxSize='150px'/>
              <Text fontSize='xl'>{title.substring(0,15)}</Text>
              <Text as='i'>{category}</Text>
              <Text fontWeight='bold'>${price}</Text>
              <Button onClick={e=>handleAddCartOnClick(e,producto)} color='blackAlpha.800' borderRadius='15px' p='0'><IoCartOutline size='2em'/></Button>
              <Button onClick={e=>handleAddFavOnClick(e,producto)} color='blackAlpha.800' borderRadius='15px' p='0'><IoHeartOutline size='2em'/></Button>
      </GridItem>
    )
  }