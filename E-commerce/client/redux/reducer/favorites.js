import {
    ADD_ITEM_FAVORITES,
    DELETE_ITEM_FAVORITES,
    GET_ALL_FAV,
  } from '../actions/actionstype.js' 
  
  const initialState = {
    backUp: [],
    itemsFav: [],
    totalPrice: 0,
  }
  
  export default function favoritesReducer(state = initialState, action) {
    let itemsFav = state.itemsFav
    switch(action.type) {
      case ADD_ITEM_FAVORITES:
        console.log(action.payload)
        return{
          ...state,
          itemsFav: [...state.itemsFav, action.payload],
        } 
      case DELETE_ITEM_FAVORITES:
        const index = itemsFav.findIndex(
          (favItem) => favItem.id === action.payload.id
        );
        let newFav = [...itemsFav];
        if(index >= 0){
          newFav.splice(index,1)
        } else{
          console.warn('Cant remove product')
        }
        return {
          ...state,
          itemsFav: newFav
        }
      case GET_ALL_FAV:
        return {
          ...state,
          itemsCart
        }
      default:
        return state;
    }
  
  }
  