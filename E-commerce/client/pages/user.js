import Navbar from '../components/Navbar/Navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Grid, Stack, Text } from '@chakra-ui/react'
import Footer from '../components/Footer/Footer';
import UserProfile from '../components/User/UserProfile';
import { wrapper } from '../redux/store';
import axios from 'axios';
import userReducer from '../redux/reducer/user';
import rootReducer from '../redux/reducer/rootReducer';

function User() {
  const dispatch = useDispatch();
//   useEffect(()=>{
//     (async () => {
//       dispatch(getItemsCart())
//     })()
//   }, [dispatch])

  return (   
    <Stack alignItems='center'>
      <Navbar />
      <UserProfile />
      <Footer />
    </Stack>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (ctx) => {
      // const config = {
      //       withCredentials: true,
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     };
      // let getUser = await axios.get(`${BASEURL}/auth/data`, config);
      // return {
      //   props: {
      //     getUser: getUser.data
      //   }
      // }
    }
);

export default User