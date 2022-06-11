import { Text, Stack, Button, Flex, Center, Heading, Progress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Navbar/Sidebar";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState('');

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
  }, [router]);

  return (
    <>
      {user ? (
        <Flex justifyContent={"space-between"}>
          <Sidebar />
          <Stack w={"80vw"} h={'100vh'} justifyContent={"center"}>
            <Text textAlign={"center"}>¡Hello!</Text>
            <Text textAlign={"center"}>
              Here you will be able to see statistical data of your business
            </Text>
            <Text textAlign={"center"}>Page under construction</Text>
          </Stack>
        </Flex>
      ) :
      <Center h={'100vh'}>
        <Stack>
          <Heading>Just a moment</Heading>
          <Progress size='md' isIndeterminate />
        </Stack>
      </Center>}
    </>
  );
};

export default Dashboard;
