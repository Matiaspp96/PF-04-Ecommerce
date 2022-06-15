import {
  Stack,
  Flex,
  Center,
  Heading,
  Progress,
  SimpleGrid
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Navbar/Sidebar";
import Barchar from "../../components/Chart/Barchar";
import Piechart from "../../components/Chart/Piechart";
import DashboardCardGroup from "../../components/Card/DashboardCardGroup";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState("");

  useEffect(() => {
    let localUser = {};
    if (localStorage.getItem("userInfo")) {
      localUser = JSON.parse(localStorage.getItem("userInfo"));
    }
    if (Object.keys(localUser).length !== 0 && localUser.role === "admin") {
      setUser(localUser.role);
    } else {
      router.push("/notAllow");
    }
  }, [router]);

  return (
    <>
      {user ? (
        <Flex justifyContent={"space-between"} bgColor={"#eceff1"}>
          <Sidebar />
          <Stack w={"100%"} m={"1rem"} justifyContent={'space-evenly'} >
            <Heading>Hi! Welcome back!</Heading>
            <DashboardCardGroup />
            <SimpleGrid columns={2} maxW={'100%'}>
            <Barchar />
            <Piechart />
            </SimpleGrid>
          </Stack>         
        </Flex>
      ) : (
        <Center h={"100vh"}>
          <Stack>
            <Heading>Just a moment</Heading>
            <Progress size="md" isIndeterminate />
          </Stack>
        </Center>
      )}
    </>
  );
};

export default Dashboard;
