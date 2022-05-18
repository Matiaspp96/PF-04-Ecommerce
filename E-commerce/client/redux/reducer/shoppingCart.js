import {
  DELETE_PRODUCT ,
} from './actions/actionstype.js' 

const initialState = {
  backUp: [],
}

export default function shoppingCartReducer(state = initialState, action) {
  switch(action.type) {
    case DELETE_PRODUCT :
      return {
      }
    default:
      return state;
  }

}
