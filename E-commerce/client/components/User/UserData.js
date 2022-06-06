import { Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserData } from "../../redux/actions/user";

const urlUserData = `${process.env.API_URL}/auth/data`;

const Data = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };

      let getUser = await axios.get(urlUserData, config);

      console.log(getUser);
      //redux
      dispatch(getUserData(getUser.data.user));
      //store local
      let localInfo = {
        token : getUser.data.token,
        _id :getUser.data.user._id
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
  }, []);
  return (
    <Center>
      <p>cargando...</p>
    </Center>
  );
};
export default Data;
