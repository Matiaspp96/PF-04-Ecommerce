import axios from "axios"; 
import alert from 'sweetalert2';
import { ADD_ITEM_FAVORITES,
    DELETE_ITEM_FAVORITES,
    GET_ALL_FAVORITES,
} from "./actionstype";


export const addItemToFav = (item) => {
  try {
    return {
      type: ADD_ITEM_FAVORITES,
      payload: item,
    }
  } catch (err) {
    console.log(err)
  }
};

export const deleteItemOfFav = (item) => {
  try {
    return {
      type: DELETE_ITEM_FAVORITES,
      payload: item._id,
    }
  } catch (err) {
    console.log(err)
  }
};

export const getItemsFav = () => {
  try {
    return {
      type: GET_ALL_FAVORITES,
    }
  } catch (err) {
    console.log(err)
  }
};