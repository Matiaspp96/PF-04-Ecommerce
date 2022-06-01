import { GET_USER_DATA } from "../actions/actionstype";

const initialState = {
    user: {},
  }

  export default function userReducer(state= initialState, action) {
    switch (action.type) {
  
      case GET_USER_DATA:
      return {
          ...state,
          user: action.payload,
        }
  
      default:
        return state;
    }
  }
  