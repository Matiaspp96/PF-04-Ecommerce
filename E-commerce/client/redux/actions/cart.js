import axios from "axios"; 
import alert from 'sweetalert2';
import { ADD_ITEM,
    DELETE_ITEM
} from "./actionstype";

export const BASEURL = 'https://fakestoreapi.com';

export const addItemToCart = (item) => {
  try {
    return {
      type: ADD_ITEM,
      payload: item,
    }
  } catch (err) {
    console.log(err)
  }
};

export const deleteItemOfCart = (id) => {
  try {
    return {
      type: DELETE_ITEM,
      payload: id,
    }
  } catch (err) {
    console.log(err)
  }
};

export const getItemsCart = () => {
  try {
    return {
      type: GET_ALL_CART,
    }
  } catch (err) {
    console.log(err)
  }
};