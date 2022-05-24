import Swal from 'sweetalert2'
import {
  ADD_ITEM,
  DELETE_ITEM,
  GET_ALL_CART,
  GET_TOTAL_PRICE,
  GET_TOTAL_ITEMS
} from '../actions/actionstype.js' 

const initialState = {
  backUp: [],
  itemsCart: [],
  totalItems: 0,
  totalPrice: 0,
}

export default function shoppingCartReducer(state = initialState, action) {
  let itemsCart = state.itemsCart
  // let totalPrice = state.totalPrice
  let cart = state.itemsCart
  let totalItems = state.totalItems
  switch(action.type) {
    case ADD_ITEM :
      let itemCart = state.itemsCart?.find(e => e.product.id === action.payload.id)
      if(itemCart){
        cart = state.itemsCart.map(e => e.product.id === action.payload.id ? {...e, quantity: e.quantity + 1, totalPrice: action.payload.price + e.quantity * e.product.price} : e )
      } else {
        cart = [...state.itemsCart, {product: action.payload, quantity: 1, totalPrice: action.payload.price}] }
        return{
          ...state,
          itemsCart: cart,
        } 
    case DELETE_ITEM:
      // const index = itemsCart.findIndex(
      //   (cartItem) => cartItem.id === action.payload.id
      // );
      // let newCart = [...itemsCart];
      // if(index >= 0){
      //   newCart.splice(index,1)
      // } else{
      //   console.warn('Cant remove product')
      // }
      const index = state.itemsCart.findIndex(e => e.product.id === action.payload.id)
      // if(itemCart && itemCart.quantity >= 2){
      //   cart = state.itemsCart.map(e => e.product.id === action.payload.id ? {...e, quantity: e.quantity - 1, totalPrice: e.quantity * e.product.price} : e )
      if(index >= 0) {
        cart.splice(index,1)
        Swal.close("Product remove")
      }
      return {
        ...state,
        itemsCart: cart 
      }
    case GET_ALL_CART:
      return {
        ...state,
        itemsCart
      }
    case GET_TOTAL_PRICE:
      // console.log(itemsCart[0].totalPrice)
      return {
        ...state,
        totalPrice: itemsCart?.reduce((acc,item) => acc + item.totalPrice, 0).toFixed(2) 
      }
    case GET_TOTAL_ITEMS:
      // console.log(totalItems)
      return {
        ...state,
        totalItems: itemsCart?.reduce((acc,item) => acc + item.quantity, 0)
      }
    default:
      return state;
  }

}
