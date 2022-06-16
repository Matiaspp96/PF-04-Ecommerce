import { Center, Stack, Heading, Progress } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserData } from "../../redux/actions/user";
import { BASEURL } from "../../redux/actions/products";
import { useRouter } from "next/router";

const urlUserData = `${BASEURL}/auth/data`;

const Data = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const [queryId, setQueryId] = useState()

  useEffect(() => {
    const query = router.query
    setQueryId(query)
    console.log(`esto es query ${query._id} `)
    console.log(`esto es query ${queryId} `)
    

    async function fetchUser(){
      const user = {
        _id: query._id
      }

      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log('llego aca en el front paso al back')
      // let getUser = await axios.get(`${BASEURL}/users/`, config);
      let getUser = await axios.post(urlUserData, user);

      console.log(getUser)

      // redux
      dispatch(getUserData(getUser.data.user));
      // store local
      let localInfo = {
        token : getUser.data.token,
        _id :getUser.data.user._id,
        role: getUser.data.user.role,
        email:getUser.data.user.email,
        name:getUser.data.user.name
      }
    
      localStorage.setItem("userInfo", JSON.stringify(localInfo));

      setUser({
        username: "",
        password: "",
      });
      if (getUser.status === 200) {
        return router.push("/");
      }
    }
    if(query._id){
      fetchUser()
    }
  },[dispatch, router]);

  function handleClick(e){
    e.preventDefault();
    setUser({
      username: "",
      password: "",
    })
  }

  return (
    <Center h={'100vh'}>
        <Stack>
          <Heading>Just a moment</Heading>
          <Progress size='md' isIndeterminate />
        </Stack>
      </Center>
  );
};
export default Data;
