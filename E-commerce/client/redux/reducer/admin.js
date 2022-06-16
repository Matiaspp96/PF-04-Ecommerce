import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_ORDERS,
  PRODUCT_BY_ID,
  GET_ORDER_DETAIL,
  FILTER_ORDERS_PAYMENT,
  FILTER_ORDERS_PURCHASE
} from '../actions/actionstype';

const initialState = {
  product: [],
  details: {},
  allProducts: [],
  totalOrders:[],
  orderDetail: {},
  filter:[]
};

export default function adminReducer(state = initialState, action){
  switch (action.type) {
    case PRODUCT_BY_ID:
      return {
        ...state,
        product: action.payload,
        details: action.payload
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        product: [...state.product, action.payload],
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        allProducts: state.product.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        allProducts: state.product.filter((item) => item.id !== action.payload),
      };
      case GET_ALL_ORDERS:
      return {
        ...state,
        totalOrders: action.payload,
        filter: action.payload,
      };
      case GET_ORDER_DETAIL:
        return {
          ...state,
          orderDetail: action.payload
        }
      case FILTER_ORDERS_PAYMENT:
        const ps = state.filter;
        const ordersFilter = action.payload === 'ALL' ? ps : ps.filter(or => or.statusPay === action.payload);
        return {
          ...state,
          totalOrders: ordersFilter
        }
        case FILTER_ORDERS_PURCHASE:
        const ps2 = state.filter;
        const ordersFilter2 = action.payload === 'ALL' ? ps2 : ps2.filter(or => or.statusPurchase === action.payload);
        return {
          ...state,
          totalOrders: ordersFilter2
        }
    default:
      return state;
  }
}
