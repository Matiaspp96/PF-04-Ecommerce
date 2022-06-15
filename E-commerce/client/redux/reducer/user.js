import { GET_USER_DATA, GET_ALL_USERS } from "../actions/actionstype";

const initialState = {
  user: {},
  users: []
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
}
