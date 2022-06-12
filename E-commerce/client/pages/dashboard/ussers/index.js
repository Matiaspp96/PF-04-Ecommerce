import { Text, Stack, Button, Flex, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/Navbar/Sidebar";
import UsersList from "../../../components/Admin/UsersList";
import { BASEURL } from "../../../redux/actions/categories";
import { configAxios } from "../../../utils/axiosConfig";
import { getAllUsers } from "../../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PaginationDisplayer from "../../../components/Pagination/PaginationDisplayer";

const Ussers = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const elements = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [users,setUsers] = useState(null);
  const usersReducer = useSelector((state) => state.userReducer.users);
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
    let axiosConfig = configAxios();
    (async () => {
      const userResponse = await axios.get(`${BASEURL}/users/`, axiosConfig);
      setUsers(userResponse.data.data);
    })();
  }, []);

  useEffect(() => {
    dispatch(getAllUsers(users));
  },[dispatch,users]);

  return (
    <>
      {user && (
        <Flex justifyContent={"space-between"} bgColor={"#eceff1"}>
          <Sidebar size={"large"} />
            {usersReducer &&
            <PaginationDisplayer
            products={usersReducer}
            elements={elements}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            Component={UsersList}
          /> }
        </Flex>
      )}
    </>
  );
};

export default Ussers;
