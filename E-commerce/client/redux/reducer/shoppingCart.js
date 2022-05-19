import {
  ADD_ITEM,
  DELETE_ITEM,
  GET_ALL_CART,
} from '../actions/actionstype.js' 

const initialState = {
  backUp: [],
  itemsCart: [],
  totalPrice: 0,
}

export default function shoppingCartReducer(state = initialState, action) {
  let itemsCart = state.itemsCart
  let totalPrice = state.totalPrice
  switch(action.type) {
    case ADD_ITEM :
      return{
        ...state,
        itemsCart: [...state.itemsCart, action.payload],
        totalPrice: itemsCart?.reduce((acc,item) => acc + item.price, 0)
      } 
    case DELETE_ITEM:
      const index = itemsCart.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      let newCart = [...itemsCart];
      if(index >= 0){
        newCart.splice(index,1)
      } else{
        console.warn('Cant remove product')
      }
      return {
        ...state,
        itemsCart: newCart
      }
    case GET_ALL_CART:
      return {
        ...state,
        itemsCart
      }
    default:
      return state;
  }

}
