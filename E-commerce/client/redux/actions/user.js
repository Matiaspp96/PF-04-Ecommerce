import { GET_USER_DATA } from "./actionstype";

export const getUserData = (user)=>{
    return {
      type: GET_USER_DATA,
      payload: user
    }
}