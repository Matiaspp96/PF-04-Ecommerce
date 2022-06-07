import {
    GET_ORDERS_USER,
    CREATE_ORDER_USER,
    UPDATE_ORDER_USER
  } from '../actions/actionstype.js' 

const initialState = {
    producstCart:[],
    shipping_address: [],
}


export default function ordersUserReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ORDERS_USER:
            return{

            };
        case CREATE_ORDER_USER:
            return{

            };
        case UPDATE_ORDER_USER:
            return{

            };
        default:
            return state;
    }
}