import { GET_USER_DATA, GET_ALL_USERS } from "./actionstype";

export const getUserData = (user)=>{
    return {
      type: GET_USER_DATA,
      payload: user
    }
}

export const getAllUsers = (users)=> {
  return {
    type: GET_ALL_USERS,
    payload: users
  }
}
