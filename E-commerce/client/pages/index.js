import Head from "next/head";
import Image from "next/image";
import Cards from "../components/Card/Cards.js";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer.js";
import { useEffect, useState } from "react";
import { BASEURL, getAllProducts } from "../redux/actions/products.js";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Flex, Text, Select } from "@chakra-ui/react";
import { addItemToCart } from "../redux/actions/cart.js";
import { getSession } from "next-auth/react";
import { getUserData } from "../redux/actions/user.js";
import Banner from "../components/Banner/Banner.js";
import cookie from 'js-cookie'

export default function Home() {
  const [user, setUser] = useState({});

  const dispatch = useDispatch();
<<<<<<< HEAD
  const ReducerUser = useSelector((state)=> state.userReducer.user);
  
  useEffect( () => {
    (async()=>{
<<<<<<< HEAD
        const userResponse = await axios.get('http://localhost:3001/api/auth/data', { withCredentials: true });
=======
        const userResponse = await axios.get(`${BASEURL}/auth/data`, { withCredentials: true });
>>>>>>> 56eecf2d20b2c2bd0df7dbf2f7e105c4a9213391
        setUser(userResponse.data)
    })();
  },[]);
  
=======
  const ReducerUser = useSelector((state) => state.userReducer.user);

>>>>>>> 78e023bd7b59e9aba338fd4fdff583ad046cf60a
  useEffect(() => {
    (async () => {
      const userResponse = await axios.get(`${BASEURL}/auth/data`, {
        withCredentials: true,
      });
      setUser(userResponse.data);
      if (userResponse.data.role === "admin") {
        cookie.set("role", "admin");
      } else if (userResponse.data.role === "user") {
        cookie.set("role", "user");
      } else {
        cookie.set("role", "guest");
      }
    })();
  }, []);

  useEffect(() => {
    dispatch(getUserData(user));
  }, [dispatch, user]);

  /*----- Cart -----*/

  return (
    <Flex flexDir="column" alignItems="center">
      <Navbar />
      <Banner />
      <Cards />
      <Footer />
    </Flex>
  );
}
