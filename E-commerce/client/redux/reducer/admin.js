import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from '../actions/actionstype';

const initialState = {
  product: [],
  details: {},
  allProducts: [],
};

export default adminReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
}
