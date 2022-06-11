import { Text, Stack, Button, Flex, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/Navbar/Sidebar";

const Ussers = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let localUser = {};
    if (localStorage.getItem("userInfo")) {
      localUser = JSON.parse(localStorage.getItem("userInfo"));
    }
    if (Object.keys(localUser).length !== 0 && localUser.role === 'admin') {
      setUser(localUser.role);
    }
    
    else{
      router.push("/notAllow");
    }
  },[router]);

  return (
    <>
    {user &&
    <Flex justifyContent={"space-between"}>
    <Sidebar size={"large"} />

    <Stack w={"80vw"} h={'100vh'} justifyContent={"center"}>
      <Text textAlign={"center"}>¡Hello!</Text>
      <Text textAlign={"center"}>
        Here you will be able to see and manage the ussers
      </Text>
      <Text textAlign={"center"}>Page under construction</Text>
    </Stack>
  </Flex> }
      
    </>
  );
};

export default Ussers;
