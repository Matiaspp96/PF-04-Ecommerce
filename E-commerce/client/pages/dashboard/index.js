import { Text, Stack, Button, Flex, Center, Heading, Progress, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Navbar/Sidebar";
import Barchar from "../../components/Chart/Barchar";
import Piechart from "../../components/Chart/Piechart";

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
          <Box w={'100%'}>
            <Box w={'50%'}>
            <Barchar />
            
            </Box>
            <Piechart></Piechart>
          </Box>
          
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
