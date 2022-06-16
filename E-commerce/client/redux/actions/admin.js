import { FILTER_ORDERS_PAYMENT, FILTER_ORDERS_PURCHASE, GET_ALL_ORDERS, GET_ORDER_DETAIL } from "./actionstype";
import { configAxios } from "../../utils/axiosConfig";
import axios from "axios";
import { BASEURL } from "../../redux/actions/products";

export const getAllOrders = () => async(dispatch)=>{
    let axiosConfig = configAxios();
    try {
        const response = await axios.get(`${BASEURL}/orders`, axiosConfig);
        return dispatch({
            type: GET_ALL_ORDERS,
            payload: response.data.data
        })
    } catch (error) {
        console.log(error)
    }
    
}

export const getOrderDetail = (id) => async(dispatch)=>{
    let axiosConfig = configAxios();
    try {
        const response = await axios.get(`${BASEURL}/orders/${id}`, axiosConfig);
        return dispatch({
            type: GET_ORDER_DETAIL,
            payload: response.data.data
        })
    } catch (error) {
        console.log(error)
    }
    
}

export const getOrdersFilterPayment = (status)=>{
    return {
      type: FILTER_ORDERS_PAYMENT,
      payload: status
    }
  }

  export const getOrdersFilterPurchase = (status)=>{
    return {
      type: FILTER_ORDERS_PURCHASE,
      payload: status
    }
  }