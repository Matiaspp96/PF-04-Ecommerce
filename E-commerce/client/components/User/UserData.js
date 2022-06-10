import { Button, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserData } from "../../redux/actions/user";
import { BASEURL } from "../../redux/actions/products";

const urlUserData = `${BASEURL}/auth/data`;

const Data = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  useEffect(() => {
    (async () => {
      console.log('paso por aca')
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log('llego aca en el front paso al back')
      let getUser = await axios.get(urlUserData, config);

      console.log(getUser);
      //redux
      dispatch(getUserData(getUser.data.user));
      //store local
      let localInfo = {
        token : getUser.data.token,
        _id :getUser.data.user._id,
        role: getUser.data.user.role,
        email:getUser.data.user.email
      }
      console.log(getUser.data)
      localStorage.setItem("userInfo", JSON.stringify(localInfo));

      setUser({
        username: "",
        password: "",
      });
      if (getUser.status === 200) {
        return router.push("/");
      }
    })();
  }, [dispatch, router]);

  function handleClick(e){
    e.preventDefault();
    setUser({
      username: "",
      password: "",
    })
  }

  return (
    <Center>
      <Button onClick={e => handleClick(e)}/>
      <p>cargando...</p>
    </Center>
  );
};
export default Data;
