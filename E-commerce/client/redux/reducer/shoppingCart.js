import Swal from 'sweetalert2'
import cookie from 'js-cookie'
import {
  ADD_ITEM,
  ADD_ITEM_INPUT,
  DELETE_ITEM,
  REMOVE_ITEM,
  GET_ALL_CART,
  GET_TOTAL_PRICE,
  GET_TOTAL_ITEMS,
  DELETE_ALL_CART,
} from '../actions/actionstype.js' 

const initialState = {
  backUp: [],
  itemsCart: cookie.get('cart') ? JSON.parse(cookie.get('cart')) : [],
  totalItems: 0,
  totalPrice: 0,
}


export default function shoppingCartReducer(state = initialState, action) {
  let itemsCart = state.itemsCart
  // let totalPrice = state.totalPrice
  let cart = state.itemsCart
  let totalItems = state.totalItems
  // console.log(itemsCart)
  switch(action.type) {
    case ADD_ITEM :
      let itemCart = itemsCart?.find(e => e.product._id === action.payload._id)
      if(itemCart) {
          cart = state.itemsCart.map(e => e.product._id === action.payload._id ? {...e, quantity: e.quantity + 1, totalPrice: action.payload.price + e.quantity * e.product.price} : e )
        } else {
          cart = [...itemsCart, {product: action.payload, quantity: 1, totalPrice: action.payload.price}] 
          Swal.fire({
            title: 'Product add to cart',
            text: 'This product is ready for your purchase 😉',
            icon:'success',
            confirmButtonText: 'Cool'
          })
        }
        cookie.set('cart', JSON.stringify(cart))
          return{
            ...state,
            itemsCart: cart,
          } 
    case ADD_ITEM_INPUT:
      itemCart = itemsCart?.find(e => e.product._id === action.payload._id)
      if(itemCart) {
        cart = state.itemsCart.map(e => e.product._id === action.payload._id 
          ? {...e, quantity: action.payload.quantity, totalPrice: action.payload.quantity * e.product.price} 
          : e)}
        return{
            ...state,
            itemsCart: cart,
        }
    case DELETE_ITEM: //Borrar articulo
      // const index = itemsCart.findIndex(
      //   (cartItem) => cartItem.id === action.payload.id
      // );
      // let newCart = [...itemsCart];
      // if(index >= 0){
      //   newCart.splice(index,1)
      // } else{
      //   console.warn('Cant remove product')
      // }
      let index = itemsCart.findIndex(e => e.product._id === action.payload._id)
      // if(itemCart && itemCart.quantity >= 2){
      //   cart = state.itemsCart.map(e => e.product.id === action.payload.id ? {...e, quantity: e.quantity - 1, totalPrice: e.quantity * e.product.price} : e )
      if(index >= 0) {
        cart.splice(index,1)
        Swal.fire({
          title: 'Product remove',
          text: 'Your pet will be left without this product 😿',
          icon: 'error',
          confirmButtonText: 'Accept'
        })
      } else {
        cart.pop()
        Swal.fire({
          title: 'Product remove',
          text: 'Product remove',
          icon:'success',
          confirmButtonText: 'Cool'
        })
      }
      cookie.set('cart', JSON.stringify(cart))
      return {
        ...state,
        itemsCart: cart 
      }
    case REMOVE_ITEM: //Remover cantidades del articulo
      index = itemsCart.findIndex(e => e.product._id === action.payload.id)
      if(index >= 0 && itemsCart[index].quantity > 1){
        cart = itemsCart.map(e => e.product._id === action.payload.id 
          ? {...e, quantity: e.quantity - 1, totalPrice: state.totalPrice + (e.quantity - 1) * e.product.price}
          : e)
      }
      return{
        ...state,
        itemsCart: cart
      }
      cookie.set('cart', JSON.stringify(cart))
    case GET_ALL_CART:
      return {
        ...state,
        itemsCart
      }
    case DELETE_ALL_CART:
      cookie.remove('cart')
      return {
        ...state,
        itemsCart: []
      }
    case GET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: itemsCart?.reduce((acc,item) => acc + item.totalPrice, 0).toFixed(2) 
      }
    case GET_TOTAL_ITEMS:
      return {
        ...state,
        totalItems: itemsCart?.reduce((acc,item) => acc + item.quantity, 0)
      }
    default:
      return state;
  }

}
