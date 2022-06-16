import Swal from 'sweetalert2'
import cookie from 'js-cookie'
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
    let favs = state.itemsFav
    switch(action.type) {
      case ADD_ITEM_FAVORITES:
        let itemFav = itemsFav?.find(e => e._id === action.payload._id)
        if(itemFav) {
          favs = itemsFav.map(e => {
            if(e._id === action.payload._id) return e
          })
        } else {
          favs = [...itemsFav, action.payload] 
        }
        cookie.set('favs', JSON.stringify(favs))
          return{
            ...state,
            itemsFav: favs,
          } 

      case DELETE_ITEM_FAVORITES:
        console.log(action.payload, itemsFav)
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
        console.log(itemsFav)
        return {
          ...state,
          itemsFav
        }
      default:
        return state;
    }
  
  }
  