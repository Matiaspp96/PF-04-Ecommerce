import Swal from 'sweetalert2'
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
  let itemsFav = initialState.itemsFav
  
  export default function favoritesReducer(state = initialState, action) {
    switch(action.type) {
      case ADD_ITEM_FAVORITES:
        // console.log(action.payload)
        return{
          ...state,
          itemsFav: [...state.itemsFav, action.payload],
        } 
      case DELETE_ITEM_FAVORITES:
        let index = itemsFav.findIndex(e => e._id === action.payload)
        let newFav = [...itemsFav];
        if(index >= 0){
          newFav.splice(index,1)
          Swal.fire({
            title: 'Product remove',
            text: 'Your pet will be left without this product 😿',
            icon: 'error',
            confirmButtonText: 'Accept'
          })
        } else{
          newFav.pop()
          Swal.fire({
            title: 'Product remove',
            text: 'Product remove',
            icon:'success',
            confirmButtonText: 'Cool'
          })
        }
        return {
          ...state,
          itemsFav: newFav
        }
      case GET_ALL_FAV:
        return {
          ...state,
          itemsFav
        }
      default:
        return state;
    }
  
  }
  