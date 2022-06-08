import {
    GET_ORDERS_USER,
    CREATE_ORDER_USER,
    UPDATE_ORDER_USER
  } from '../actions/actionstype.js' 

const initialState = {
    idOrder:"",
    buyer:{},
    producstCart:[],
    shippingaddress: [],
}


export default function ordersUserReducer(state = initialState, action) {
    let idOrder = initialState.idOrder
    switch(action.type) {
        case GET_ORDERS_USER:
            return{

            };
        case CREATE_ORDER_USER:
            return{
                ...state,
                idOrder: action.payload
            };
        case UPDATE_ORDER_USER:
            return{

            };
        default:
            return state;
    }
}