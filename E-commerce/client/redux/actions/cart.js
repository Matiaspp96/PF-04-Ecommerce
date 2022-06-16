import axios from "axios"; 
import alert from 'sweetalert2';
import { ADD_ITEM,
    ADD_ITEM_INPUT,
    DELETE_ITEM,
    REMOVE_ITEM,
    GET_ALL_CART,
    GET_TOTAL_PRICE,
    GET_TOTAL_ITEMS,
    DELETE_ALL_CART
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

export const addItemToCartInput = (item) => {
  try {
    return {
      type: ADD_ITEM_INPUT,
      payload: item,
    }
  } catch (err) {
    console.log(err)
  }
};

export const deleteItemOfCart = (id) => { //Borrar articulo
  try {
    return {
      type: DELETE_ITEM,
      payload: id,
    }
  } catch (err) {
    console.log(err)
  }
};


export const removeItemOfCart = (id) => { //Manejar cantidades
  try {
    return {
      type: REMOVE_ITEM,
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

export const deleteAllCart = () => {
  try {
    return {
      type: DELETE_ALL_CART,
    }
  } catch (err) {
    console.log(err)
  }
};

export const getTotalPrice = () => {
  try {
    return {
      type: GET_TOTAL_PRICE,
    }
  } catch (err) {
    console.log(err)
  }
};

export const getTotalItems = () => {
  try {
    return {
      type: GET_TOTAL_ITEMS,
    }
  } catch (err) {
    console.log(err)
  }
};