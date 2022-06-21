import { Text, Stack, Button, Flex, Center, Heading, Progress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/Navbar/Sidebar";
import UsersList from "../../../components/Admin/UsersList";
import { getAllUsers } from "../../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import PaginationDisplayer from "../../../components/Pagination/PaginationDisplayer";

const Ussers = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const elements = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const users = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch()

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

  useEffect(() => {
    dispatch(getAllUsers());
  },[dispatch]);

  return (
    <>
      {user ? (
        <Flex justifyContent={"space-between"} bgColor={"#eceff1"}>
          <Sidebar size={"large"} />
            {users &&
            <PaginationDisplayer
            products={users}
            elements={elements}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            Component={UsersList}
          /> }
        </Flex>
      ):
      <Center h={'100vh'}>
        <Stack>
          <Heading>Just a moment</Heading>
          <Progress size='md' isIndeterminate />
        </Stack>
      </Center>
      }
    </>
  );
};

export default Ussers;
