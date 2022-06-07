import { Text, Stack, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/Navbar/Sidebar";

const Ussers = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    let localUser = {};
      if(localStorage.getItem('userInfo')){
         localUser = JSON.parse(localStorage.getItem('userInfo'));
      }
         console.log(localUser)
      if(Object.keys(localUser).length !== 0){
         setUser(localUser.role)
         
       }
  });

  return (
    <>
      {user === "admin" ? (
        <Flex justifyContent={"space-between"}>
          <Sidebar size={"large"} />

          <Stack w={"80vw"} justifyContent={"center"}>
            <Text textAlign={"center"}>¡Hello!</Text>
            <Text textAlign={"center"}>
              Here you will be able to see and manage the ussers
            </Text>
            <Text textAlign={"center"}>Page under construction</Text>
          </Stack>
        </Flex>
      ) : (
        <Stack>
          <Text>Access denied. You are not an Admin</Text>
          <Text textAlign={"center"}>
            Think this is an error? Contact Support
          </Text>
          <Button
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </Button>
        </Stack>
      )}
    </>
  );
};

export default Ussers;
