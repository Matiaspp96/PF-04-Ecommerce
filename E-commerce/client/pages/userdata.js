import axios from "axios";
import Data from "../components/User/UserData";
import { BASEURL } from "../redux/actions/products";
import { wrapper } from "../redux/store";

function userDataGoogle({getUser}) {
  // console.log(getUser)

  return (
    <Data />
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async (ctx) => {
//       const config = {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           };
//       let getUser = await axios.get(`${BASEURL}/auth/data`, config);
//       console.log(getUser.data)
//       return {
//         props: {
//           getUser: getUser.data
//         }
//       }
//     }
// );

export default userDataGoogle