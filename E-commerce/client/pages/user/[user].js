import Navbar from '../../components/Navbar/Navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center, Grid, Stack, Text } from '@chakra-ui/react'
import Footer from '../../components/Footer/Footer';
import UserProfile from '../../components/User/UserProfile';
import { wrapper } from '../../redux/store';
import axios from 'axios';
import userReducer from '../../redux/reducer/user';
import rootReducer from '../../redux/reducer/rootReducer';
import { Router, useRouter } from 'next/router';

function User() {
  const router = useRouter()
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

export default User
